import competitionSuggestions from "./competititonSuggestionsResult";
import { COMPETITION_SUGGESTIONS_QUERY } from "./../StageFavouritesProvider";

export default {
  request: {
    query: COMPETITION_SUGGESTIONS_QUERY,
    variables: { id: 1000093190 },
  },
  result: {
    data: competitionSuggestions,
  },
};
