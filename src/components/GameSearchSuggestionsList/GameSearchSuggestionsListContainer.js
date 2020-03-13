// @flow
import React from "react";
import { GameSearchSuggestionsList } from "./GameSearchSuggestionsList";
import { useGameSearchSuggestions } from "./useGameSearchSuggestions";
import type { Props as UseGameSearchSuggestionsProps } from "./useGameSearchSuggestions";

type Props = UseGameSearchSuggestionsProps;

export const GameSearchSuggestionsListContainer = ({
  searchResults,
}: Props) => {
  const { list, loading } = useGameSearchSuggestions({ searchResults });

  return <GameSearchSuggestionsList list={list} loading={loading} />;
};
