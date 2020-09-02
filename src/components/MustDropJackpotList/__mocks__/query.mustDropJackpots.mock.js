import { MustDropJackpotGamesListQuery } from "../MustDropJackpotListContainer.graphql";
import games from "./response.games.mock";

export default {
  request: {
    query: MustDropJackpotGamesListQuery,
    variables: {},
  },
  result: {
    data: {
      gamesList: {
        name: "Must drop jackpots",
        games,
      },
    },
  },
};
