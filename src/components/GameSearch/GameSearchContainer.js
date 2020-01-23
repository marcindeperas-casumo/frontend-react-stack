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

export const GameSearchContainer = props => {
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
    console.log('------------------------------------');
    console.log('fetchMoreRows');
    console.log('------------------------------------');
    return fetchMore({
      variables: {
        query: searchQuery,
        pageSize: 50,
        page: searchResults.length / 50,
      },
      updateQuery: (prevData, { fetchMoreResult }) => {
        // if you do not get any new results, it just returns the old data
        if (!fetchMoreResult) {
          return prevData;
        }
        console.log('------------------------------------');
        console.log('updateQuery');
        console.log('------------------------------------');

        return R.mergeDeepRight(prevData, {
          gamesSearch: {
            searchResultsCount: fetchMoreResult.gamesSearch.searchResultsCount,
            results: [
              ...prevData.gamesSearch.results,
              ...fetchMoreResult.gamesSearch.results,
            ],
          },
        });
      },
    }).then(({ data: newData }) => {
      // virtualist list expects this data to come back immediately as a Promise
      return [...searchResults, ...newData.gamesSearch.results];
    });
  };

  const clearSearch = () => setSearchQuery("");

  console.log('------------------------------------');
  console.log(searchResults);
  console.log('------------------------------------');

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
