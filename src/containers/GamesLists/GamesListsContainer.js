import React from "react";
import GameBrowserService, {
  gameInMaintenanceMode,
} from "../../applicationService/GameBrowserService";
import GamesList from "../../components/GamesList";
import { identity, compose, not, arrayToObject } from "../../lib/utils";
import GamesListsSkeleton from "./GamesListsSkeleton";
import JackpotsService from "../../applicationService/JackpotsService";

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

    // Filter out games in maintenance. Unless they are the last played games
    // list.
    const filteredList = data.map(gameList => {
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
            <GamesList key={gameList.title} {...gameList} />
          ))}
      </React.Fragment>
    );
  }
}
