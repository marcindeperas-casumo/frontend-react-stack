import { GET_JACKPOTS } from "../JackpotsContainer";
import games from "./response.games.mock";

export default {
  request: {
    query: GET_JACKPOTS,
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
