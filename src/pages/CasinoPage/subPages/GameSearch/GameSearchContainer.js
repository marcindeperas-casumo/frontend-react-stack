// @flow
import React from "react";
import { GameSearch } from "Components/GameSearch/GameSearch";
import { mockedSearchResults } from "./__mocks__";

// const PAGE_SIZE = 50;

export const GameSearchContainer = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data } = mockedSearchResults;

  const inputPromptPlaceholder = "E.g. game name, game provider etc";
  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];

  const [pageNumber, setPageNumber] = React.useState(0);

  const fetchMoreRows = () => {
    setPageNumber(pageNumber + 1);
    console.warn("fetchMoreRows");
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(data);
      }, 0);
    });
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <GameSearch
      searchResults={searchResults}
      searchResultsCount={searchResultsCount}
      loading={false}
      loadingSuggestions={false}
      suggestions={[]}
      inputPromptPlaceholder={inputPromptPlaceholder}
      fetchMoreRows={fetchMoreRows}
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
    />
  );
};
