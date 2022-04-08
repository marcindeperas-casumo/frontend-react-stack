import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { GameSearch } from "Components/GameSearch/GameSearch";
import { loadMoreConstructor } from "Utils";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { GameSearchQuery } from "./GameSearchContainer.graphql";
import { useGameSearchSuggestions } from "./useGameSearchSuggestions";

export const GameSearchContainer = (props: { path?: string }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { data, loading, fetchMore } = useQuery<
    A.GameSearchQuery,
    A.GameSearchQueryVariables
  >(GameSearchQuery, {
    // if you search for an empty string or spaces or whitespace, the server should take care of it
    variables: {
      query: searchQuery,
      offset: 0,
      limit: 48,
    },
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  });
  const fetchMoreRows = loadMoreConstructor(fetchMore);
  const { t } = useTranslationsGql({
    searchSuggestionText: "root:mobile.games-search:fields.input_prompt",
  });
  const inputPromptPlaceholder = t?.searchSuggestionText || "";
  const searchResultsCount = data?.gamesSearch?.gamesCount || 0;
  const searchResults = data?.gamesSearch?.games || [];
  const { list, loading: loadingSuggestions } = useGameSearchSuggestions({
    searchResults,
  });

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
      queryChanged={setSearchQuery}
      query={searchQuery}
      clearSearch={clearSearch}
    />
  );
};
