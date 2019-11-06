import competitionSuggestions from "./competititonSuggestionsResult";
import { PLAYER_VERTICAL_QUERY } from "./../StageFavouritesProvider";

export default {
  request: {
    query: PLAYER_VERTICAL_QUERY,
  },
  result: {
    data: {
      __typename: "Player",
      player: {
        __typename: "Vertical",
        vertical: "SPORTS",
      },
    },
  },
};
