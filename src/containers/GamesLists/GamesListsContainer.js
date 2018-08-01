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

const liveCasinoLobbyGames = (games, lobby) => {
  const list = [...games];
  const lobbyData = list.map(o => {
    if (lobby.length) {
      const t = lobby.find(t => t.id === o.providerGameId);
      return t ? { ...o, lobby: { ...t } } : o;
    } else {
      return o;
    }
  });
  return lobbyData.filter(o => o.lobby);
};

export default class GamesListsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingTop: false,
      data: [],
      loadingLobby: true,
      lobby: [],
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loadingTop: true });

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
            loadingTop: false,
            data,
          },
          this.launchLiveCasinoSocket
        );
      })
      .catch(e => {
        this.setState({
          ...this.state,
          loadingTop: false,
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
        this.setState(
          {
            ...this.state,
            lobby: data,
            loadingLobby: false,
          },
          () => console.log("liveCasino updated", this.state.lobby)
        );
    };
  }

  render() {
    const { data, loadingTop, loadingLobby, lobby } = this.state;

    // Filter out games in maintenance.
    // Unless they are the last played games list.
    const filteredList = data.map(gameList => {
      if (gameList.id === "latestPlayedGames") {
        return gameList;
      }
      if (gameList.id === "liveCasinoGames") {
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
        {loadingTop && <GamesListsSkeleton />}
        {!loadingTop &&
          filteredList.map(gameList => (
            <GameList
              key={gameList.title}
              loadingLobby={loadingLobby}
              display={getDisplay(gameList.id)}
              {...gameList}
            />
          ))}
      </React.Fragment>
    );
  }
}
