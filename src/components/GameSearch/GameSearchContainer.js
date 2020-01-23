// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameSearch } from "Components/GameSearch/GameSearch";
import {
  GameSearchQuery,
  GameSearchCMSQuery,
} from "./GameSearchContainer.graphql";

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
  const { data: cmsData } = useQuery(GameSearchCMSQuery);
  const inputPromptPlaceholder = cmsData?.searchSuggestionText || "";
  const searchResultsCount = data?.gamesSearch?.resultsCount || 0;
  const searchResults = data?.gamesSearch?.results || [];

  React.useEffect(() => {
    refetch({
      query: searchQuery,
      pageSize: 50,
      page: 0,
    });
  }, [searchQuery, refetch]);

  const fetchMoreRows = () => {
    return fetchMore<A.GameSearchQueryVariables>({
      variables: {
        query: searchQuery,
        pageSize: 50,
        page: searchResults.length / 50,
      },
      updateQuery: (prevData, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prevData;
        }

        return R.mergeDeepRight(prevData, {
          gamesSearch: {
            searchResultsCount: fetchMoreResult.gamesSearch.resultsCount,
            results: [
              ...prevData.gamesSearch.results,
              ...fetchMoreResult.gamesSearch.results,
            ],
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
