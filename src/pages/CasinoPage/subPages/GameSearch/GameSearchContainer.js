// @flow
import React from "react";
import * as R from "ramda";
import { insertIntoArray } from "Utils/gamesPaginated";
import { useGameSearchSuggestions } from "Components/GameSearch/useGameSearchSuggestions";
import { GameSearch } from "./GameSearch";
import { mockedSearchResults, mockedTranslations as t } from "./__mocks__";

const PAGE_SIZE = 50;

export const GameSearchContainer = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data } = mockedSearchResults;

  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];
  const { list, loading: loadingSuggestions } = useGameSearchSuggestions({
    searchResults,
  });

  const [pageNumber, setPageNumber] = React.useState(0);

  const fetchMoreRows = () => {
    setPageNumber(currPageNumber => currPageNumber + 1);

    const mergedResults = insertIntoArray(
      searchResults,
      pageNumber * PAGE_SIZE
    )(searchResults);

    return new Promise(resolve => {
      resolve(
        R.mergeDeepRight(data, {
          gamesSearch: {
            searchResultsCount: searchResultsCount,
            results: searchQuery
              ? mergedResults
              : R.sortBy(R.prop("name"), mergedResults),
          },
        })
      );
    });
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <GameSearch
      searchResults={searchResults}
      searchResultsCount={searchResultsCount}
      loading={false}
      loadingSuggestions={loadingSuggestions}
      suggestions={list}
      fetchMoreRows={fetchMoreRows}
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
      t={t}
    />
  );
};
