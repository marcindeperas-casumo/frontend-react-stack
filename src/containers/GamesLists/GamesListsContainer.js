import React from "react";
import { compose, identity, not } from "ramda";

import GameBrowserService, {
  gameInMaintenanceMode,
} from "Services/GameBrowserService";
import JackpotsService from "Services/JackpotsService";
import GameList from "Components/GameList";
import { arrayToObject } from "Utils/index";
import GamesListsSkeleton from "Containers/GamesLists/GamesListsSkeleton";

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
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    // We need to make this promise cancelable
    Promise.all([
      GameBrowserService.latestPlayedGames(),
      GameBrowserService.allTopLists(),
      JackpotsService.jackpots(),
    ])
      .then(([latestPlayedGames, allTopLists, jackpots]) => {
        const jackpotsDataById = arrayToObject(jackpots, "jackpotId");

        // `latestPlayedGames` could be `null`, in case the player hasn't played any
        // game yet. That is why we need to run a identity filter.
        return [latestPlayedGames, ...allTopLists]
          .filter(identity)
          .map(list => {
            return {
              ...list,
              games: list.games.map(game => {
                return {
                  ...game,
                  jackpotInfo: !!game.jackpotId
                    ? jackpotsDataById[game.jackpotId]
                    : null,
                };
              }),
            };
          });
      })
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data,
        });
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

  render() {
    const { data, loading } = this.state;

    const filteredList = data.map(gameList => {
      // Filter out games in maintenance
      // unless they are the last played games list.
      if (gameList.id === "latestPlayedGames") {
        return gameList;
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
              display={listTypeByListId(gameList.id)}
              {...gameList}
            />
          ))}
      </React.Fragment>
    );
  }
}

const listIdToGamesList = {
  exclusiveGames: "exclusiveTiles",
  liveCasinoGames: "liveCasinoCards",
  liveCasino: "liveCasinoCards",
  default: "tiles",
};

const listTypeByListId = listId => {
  return listIdToGamesList[listId] || listIdToGamesList.default;
};
