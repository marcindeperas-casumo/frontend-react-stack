import { TOP_SEARCHES_QUERY, SEARCH_QUERY } from "../KambiSearchResults";
import { mocks as termMocks } from "./termMocks";
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
    data: searchResults.hasResults,
  },
};

const noSearchResultsMock = {
  request: {
    query: SEARCH_QUERY,
    variables: {
      query: "arsez",
    },
  },
  result: {
    data: searchResults.noResults,
  },
};

export default {
  // error: [topSearchesMock, searchResultsMock, ...termMocks],
  // notSearching: [topSearchesMock, searchResultsMock, ...termMocks],
  hasResults: [topSearchesMock, searchResultsMock, ...termMocks],
  noResults: [topSearchesMock, noSearchResultsMock, ...termMocks],
};
