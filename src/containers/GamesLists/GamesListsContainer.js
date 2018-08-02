import React from "react";
import GameBrowserService, {
  gameInMaintenanceMode,
} from "../../applicationService/GameBrowserService";
import GameList from "../../components/GameList";
import { identity, compose, not } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";
import LiveCasinoClient from "../../serviceClients/LiveCasinoClient";
import { SKELETON_LIST_MOCK } from "../../constants";

const gamesNotInMaintenance = compose(
  not,
  gameInMaintenanceMode
);
const removeGamesInMaintenance = games => games.filter(gamesNotInMaintenance);

const liveCasinoLobbyGames = (list, lobby) =>
  [...list]
    .map(o => {
      const t = lobby.find(t => t.id === o.providerGameId);
      return t ? { ...o, lobby: { ...t } } : o;
    })
    .filter(o => o.lobby);

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
    const ws = new LiveCasinoClient();
    const lc = this.state.data.find(o => o.id === "liveCasinoGames");
    ws.onmessage = m => {
      const args = { games: lc.games, lobby: this.state.lobby, payload: m };
      const lobbyData = ws.processType(args);
      if (lobbyData)
        this.setState(
          {
            ...this.state,
            lobby: lobbyData,
          },
          () => console.log("liveCasino lobby updated")
        );
    };
  }

  render() {
    const { data, loading, lobby } = this.state;

    // Filter out games in maintenance.
    // Unless they are the last played games list.
    const filteredList = data.map(gameList => {
      if (gameList.id === "latestPlayedGames") {
        return gameList;
      }
      if (lobby.length !== 0 && gameList.id === "liveCasinoGames") {
        // grab LiveCasino lobby data with games list
        const list = { ...gameList };
        list.games = liveCasinoLobbyGames(list.games, lobby);
        return list;
      }

      return { ...gameList, games: removeGamesInMaintenance(gameList.games) };
    });

    const getDisplay = id =>
      SKELETON_LIST_MOCK.find(o => o.id === id).display || "tiles";

    return (
      <React.Fragment>
        {loading && <GamesListsSkeleton />}
        {!loading &&
          filteredList.map(gameList => (
            <GameList
              key={gameList.title}
              display={getDisplay(gameList.id)}
              {...gameList}
            />
          ))}
      </React.Fragment>
    );
  }
}
