import React from "react";
import { noop } from "Utils";
import {
  mockedSearchResults,
  mockedSuggestions,
  mockedTranslations as t,
} from "./__mocks__";
import { GameSearch } from "./GameSearch";

// eslint-disable-next-line no-unused-vars
const PAGE_SIZE = 50;
// eslint-enable-next-line no-unused-vars

export const GameSearchContainer = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data } = mockedSearchResults;

  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];

  // eslint-disable-next-line no-unused-vars
  const [pageNumber, setPageNumber] = React.useState(0);
  // eslint-enable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const fetchMoreRows = () => {
    setPageNumber(currPageNumber => currPageNumber + 1);
    // todo: implement later, likely causing current issues
  };
  // eslint-ensable-next-line no-unused-vars

  const clearSearch = () => setSearchQuery("");

  return (
    <GameSearch
      searchResults={searchResults}
      searchResultsCount={searchResultsCount}
      loading={false}
      loadingSuggestions={false}
      suggestions={mockedSuggestions}
      fetchMoreRows={noop}
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
      t={t}
    />
  );
};
