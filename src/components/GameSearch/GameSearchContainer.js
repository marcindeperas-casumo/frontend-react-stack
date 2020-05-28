// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameSearch } from "Components/GameSearch/GameSearch";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { GameSearchQuery } from "./GameSearchContainer.graphql";

export const GameSearchContainer = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, loading, fetchMore, refetch } = useQuery<
    A.GameSearchQuery,
    A.GameSearchQueryVariables
  >(GameSearchQuery, {
    // if you search for an empty string or spaces or whitespace, the server should take care of it
    variables: {
      query: "",
      pageSize: 50,
      page: 0,
    },
  });
  const { t } = useTranslationsGql({
    searchSuggestionText: "root:mobile.games-search:fields.input_prompt",
  });
  const inputPromptPlaceholder = t?.searchSuggestionText || "";
  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];
  const [pageNumber, setPageNumber] = React.useState(1);

  React.useEffect(() => {
    setPageNumber(1);

    refetch({
      query: searchQuery,
      pageSize: 50,
      page: 0,
    });
  }, [searchQuery, refetch]);

  const fetchMoreRows = () => {
    setPageNumber(pageNumber + 1);
    return fetchMore<A.GameSearchQueryVariables>({
      variables: {
        query: searchQuery,
        pageSize: 50,
        page: pageNumber,
      },
      updateQuery: (prevData, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevData;
        }

        const mergedResults = [
          ...prevData.gamesSearch.results,
          ...fetchMoreResult.gamesSearch.results,
        ];

        return R.mergeDeepRight(prevData, {
          gamesSearch: {
            searchResultsCount: fetchMoreResult.gamesSearch.resultsCount,
            // if searching let the server define the order of results.
            // without the sorting scrolling really fast would mess up the list ordering.
            // https://github.com/Casumo/frontend-react-stack/pull/1012
            results: searchQuery
              ? mergedResults
              : R.sortBy(R.prop("name"), mergedResults),
          },
        });
      },
    });
  };

  const clearSearch = () => setSearchQuery("");

  return (
    <GameSearch
      searchResults={searchResults}
      searchResultsCount={searchResultsCount}
      loading={loading}
      inputPromptPlaceholder={inputPromptPlaceholder}
      fetchMoreRows={fetchMoreRows}
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
    />
  );
};
