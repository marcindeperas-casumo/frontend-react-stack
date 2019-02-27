import { types } from "Models/gameSearch";

export const getSearchFetchCompleteType = query =>
  `${types.GAME_SEARCH_FETCH_COMPLETE}_QUERY_${query}`;
