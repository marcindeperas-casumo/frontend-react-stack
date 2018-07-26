import React from "react";
import GameBrowserService, {
  gameInMaintenanceMode,
} from "../../applicationService/GameBrowserService";
import GameList from "../../components/GameList";
import { identity, compose, not } from "../../utils";
import GamesListsSkeleton from "./GamesListsSkeleton";

import LiveCasinoClient from "../../serviceClients/LiveCasinoClient";

const gamesNotInMaintenance = compose(
  not,
  gameInMaintenanceMode
);
const removeGamesInMaintenance = games => games.filter(gamesNotInMaintenance);

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

    ws.onmessage = m => {
      const data = ws.processType(this.state.data, m);
      if (data)
        this.setState({ ...this.state, lobby: data }, () =>
          console.log("liveCasinoData updated", this.state.lobby)
        );
    };
  }

  render() {
    const { data, loading, lobby } = this.state;

    // Filter out games in maintenance. Unless they are the last played games
    // list.
    const filteredList = data.map(gameList => {
      if (gameList.id === "latestPlayedGames") {
        return gameList;
      }

      return { ...gameList, games: removeGamesInMaintenance(gameList.games) };
    });

    // Merge Live Casino data with games list.
    const mergedList = filteredList.map(gameList => {
      if (gameList.id === "liveCasinoGames") {
        const list = { ...gameList };
        const mergedGames = gameList.games.map(o => {
          if (lobby.length) {
            const t = lobby.find(t => t.id === o.providerGameId);
            return t ? { ...o, lobby: { ...t } } : o;
          } else {
            return o;
          }
        });
        list.games = mergedGames;
        return list;
      }
      return gameList;
    });

    return (
      <React.Fragment>
        {loading && <GamesListsSkeleton />}
        {!loading &&
          mergedList.map(gameList => (
            <GameList key={gameList.title} {...gameList} />
          ))}
      </React.Fragment>
    );
  }
}
