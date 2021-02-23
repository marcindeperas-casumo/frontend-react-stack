// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameSearch } from "Components/GameSearch/GameSearch";
import { insertIntoArray } from "Utils/gamesPaginated";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameSearchContainer.graphql'... Remove this comment to see the full error message
import { GameSearchQuery } from "./GameSearchContainer.graphql";
import { useGameSearchSuggestions } from "./useGameSearchSuggestions";

const pageSize = 50;
export const GameSearchContainer = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, loading, fetchMore } = useQuery<
    A.GameSearchQuery,
    A.GameSearchQueryVariables
  >(GameSearchQuery, {
    // if you search for an empty string or spaces or whitespace, the server should take care of it
    variables: {
      query: searchQuery,
      pageSize,
      page: 0,
    },
    fetchPolicy: "network-only",
  });
  const { t } = useTranslationsGql({
    searchSuggestionText: "root:mobile.games-search:fields.input_prompt",
  });
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchSuggestionText' does not exist on ... Remove this comment to see the full error message
  const inputPromptPlaceholder = t?.searchSuggestionText || "";
  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];
  const { list, loading: loadingSuggestions } = useGameSearchSuggestions({
    searchResults,
  });

  const [pageNumber, setPageNumber] = React.useState(0);

  const fetchMoreRows = () => {
    setPageNumber(pageNumber + 1);
    // @ts-expect-error ts-migrate(2344) FIXME: Type 'GameSearchQueryVariables' does not satisfy t... Remove this comment to see the full error message
    return fetchMore<A.GameSearchQueryVariables>({
      variables: {
        page: pageNumber,
      },
      updateQuery: (prevData, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevData;
        }

        const mergedResults = insertIntoArray(
          fetchMoreResult.gamesSearch.results,
          pageNumber * pageSize
        )(prevData.gamesSearch.results);

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
      loadingSuggestions={loadingSuggestions}
      suggestions={list}
      inputPromptPlaceholder={inputPromptPlaceholder}
      fetchMoreRows={fetchMoreRows}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Dispatch<SetStateAction<string>>' is not ass... Remove this comment to see the full error message
      queryChanged={setSearchQuery}
      query={searchQuery}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type '() =>... Remove this comment to see the full error message
      clearSearch={clearSearch}
    />
  );
};
