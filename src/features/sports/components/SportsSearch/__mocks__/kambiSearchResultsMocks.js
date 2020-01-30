import { TOP_SEARCHES_QUERY, SEARCH_QUERY } from "../KambiSearchResults";
import termMocks from "./termMocks";
import searchResults from "./searchResults";
import topSearchesResults from "./topSearchesResults";

const topSearchesMock = {
  request: {
    query: TOP_SEARCHES_QUERY,
    variables: {
      count: 4,
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
      query: "nothingtofind",
    },
  },
  result: {
    data: searchResults.noResults,
  },
};

const notSearchingMock = {
  request: {
    query: SEARCH_QUERY,
    variables: {
      query: "",
    },
  },
  result: {
    data: searchResults.noResults,
  },
};

export default {
  notSearching: [topSearchesMock, notSearchingMock, ...termMocks],
  hasResults: [topSearchesMock, searchResultsMock, ...termMocks],
  noResults: [topSearchesMock, noSearchResultsMock, ...termMocks],
};
