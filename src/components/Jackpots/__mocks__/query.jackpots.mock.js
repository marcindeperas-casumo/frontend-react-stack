import { JackpotsQuery } from "../Jackpots.graphql";
import games from "./response.games.mock";

export default {
  request: {
    query: JackpotsQuery,
    variables: {},
  },
  result: {
    data: {
      gamesList: {
        title: "Jackpots",
        games,
      },
    },
  },
};
