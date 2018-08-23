import React from "react";
import GameBrowserService, {
  gameInMaintenanceMode,
} from "../../applicationService/GameBrowserService";
import GameList from "../../components/GameList";
import { identity, compose, not } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";

import LiveCasinoClient from "../../serviceClients/LiveCasinoClient";
import LiveCasinoServiceEvo from "../../applicationService/LiveCasinoServiceEvo";

const gamesNotInMaintenance = compose(
  not,
  gameInMaintenanceMode
);
const removeGamesInMaintenance = games => games.filter(gamesNotInMaintenance);
const ifLiveCasino = LiveCasinoServiceEvo.ifLiveCasino;
const getLobbyLink = LiveCasinoServiceEvo.getLobbyLink;

export default class GamesListsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      lobby: [],
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    Promise.all([
      GameBrowserService.latestPlayedGames(),
      GameBrowserService.allTopLists(),
    ])
      .then(([latestPlayedGames, allTopLists]) => {
        // `latestPlayedGames` could be `null`, in case the player hasn't played any
        // game yet. That is why we need to run a identity filter.
        return [latestPlayedGames, ...allTopLists].filter(identity);
      })
      .then(data => {
        this.setState(
          {
            ...this.state,
            loading: false,
            data,
          },
          this.launchLiveCasinoSocket
        );
      })
      .catch(e => {
        this.setState({
          ...this.state,
          loading: false,
          data: [],
        });
        console.error(e);
      });
  }

  launchLiveCasinoSocket() {
    const lc = this.state.data.find(o => ifLiveCasino(o.id));
    if (lc) {
      const ws = new LiveCasinoClient();
      ws.onmessage = m => {
        const args = { games: lc.games, lobby: this.state.lobby, payload: m };
        const lobbyData = LiveCasinoServiceEvo.processLobby(args);
        if (lobbyData)
          this.setState({
            ...this.state,
            lobby: lobbyData,
          });
      };
      ws.onerror = e => {
        if (e === "MAX_RECONNECT")
          this.setState({
            ...this.state,
            lobbyError: true,
          });
      };
    }
  }

  render() {
    const { data, loading, lobby } = this.state;

    const filteredList = data.map(gameList => {
      // Filter out games in maintenance
      // unless they are the last played games list.
      if (gameList.id === "latestPlayedGames") {
        return gameList;
      }
      // Filter out games in Lobby against gameBrowser data
      // for Live Casino.
      if (ifLiveCasino(gameList.id) && !this.state.lobbyError) {
        return {
          ...gameList,
          games: LiveCasinoServiceEvo.getLiveCasinoGames(gameList.games, lobby),
        };
      }

      return { ...gameList, games: removeGamesInMaintenance(gameList.games) };
    });

    return (
      <React.Fragment>
        {loading && <GamesListsSkeleton />}
        {!loading &&
          filteredList.map(gameList => (
            <GameList
              key={gameList.title}
              display={
                ifLiveCasino(gameList.id) && !this.state.lobbyError
                  ? "cards"
                  : "tiles"
              }
              link={ifLiveCasino(gameList.id) ? getLobbyLink() : null}
              {...gameList}
            />
          ))}
      </React.Fragment>
    );
  }
}
