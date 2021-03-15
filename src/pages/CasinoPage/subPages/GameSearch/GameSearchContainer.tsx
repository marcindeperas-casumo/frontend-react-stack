import React from "react";
import {
  mockedSearchResults,
  mockedSuggestions,
  mockedTranslations as t,
} from "./__mocks__";
import { GameSearch } from "./GameSearch";

export const GameSearchContainer: React.FC<void> = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data } = mockedSearchResults;

  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];

  const clearSearch = () => setSearchQuery("");

  return (
    <GameSearch
      searchResults={searchResults}
      searchResultsCount={searchResultsCount}
      loading={false}
      loadingSuggestions={false}
      suggestions={mockedSuggestions}
      fetchMoreRows={() => Promise.resolve(undefined)}
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
      t={t}
    />
  );
};
