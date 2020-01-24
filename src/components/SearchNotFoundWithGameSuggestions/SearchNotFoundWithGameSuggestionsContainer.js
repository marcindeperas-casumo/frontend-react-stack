// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useGameSearchSuggestions } from "Components/GameSearchSuggestionsList/useGameSearchSuggestions";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";
import { SearchNotFoundWithGameSuggestionsContainerQuery } from "./GameSearchNotFoundContainer.graphql";

export const SearchNotFoundWithGameSuggestionsContainer = () => {
  const { data, loading: translationsLoading } = useQuery<
    A.SearchNotFoundWithGameSuggestionsContainerQuery,
    _
  >(SearchNotFoundWithGameSuggestionsContainerQuery);
  const { list, loading: listLoading } = useGameSearchSuggestions({
    searchResults: [],
  });

  if (translationsLoading) {
    return null;
  }

  // fetching latest played gaes takes its sweet time. We wanna show the not found image and text immediately.
  const getContent = () => {
    if (listLoading) {
      return "";
    }

    return list.type === "latest" ? data?.contentLatest : data?.contentPopular;
  };

  return (
    <SearchNotFoundWithGameSuggestions
      image={data?.image || ""}
      title={data?.title || ""}
      content={getContent() || ""}
      list={list}
      loading={translationsLoading}
    />
  );
};
