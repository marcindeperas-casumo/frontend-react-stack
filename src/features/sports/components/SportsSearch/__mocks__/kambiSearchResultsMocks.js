import { TOP_SEARCHES_QUERY, SEARCH_QUERY } from "../KambiSearchResults";
import searchResults from "./searchResults";
import topSearchesResults from "./topSearchesResults";

const topSearchesMock = {
  request: {
    query: TOP_SEARCHES_QUERY,
    variables: {
      count: 5,
    },
  },
  result: {
    data: topSearchesResults.hasResults,
  },
};

const searchResultsMock = {
  request: {
    query: SEARCH_QUERY,
    variables: {
      query: "arse",
    },
  },
  result: {
    data: searchResults,
  },
};

export default {
  error: [topSearchesMock, searchResultsMock],
  notSearching: [topSearchesMock, searchResultsMock],
  hasResults: [topSearchesMock, searchResultsMock],
  noResults: [topSearchesMock, searchResultsMock],
};
