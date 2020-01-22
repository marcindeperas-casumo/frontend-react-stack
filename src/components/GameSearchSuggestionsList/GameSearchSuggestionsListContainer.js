// @flow
import React from "react";
import { GameSearchSuggestionsList } from "./GameSearchSuggestionsList";
import { useGameSearchSuggestions } from "./useGameSearchSuggestions";

export const GameSearchSuggestionsListContainer = ({ searchResults }) => {
  const { list, loading } = useGameSearchSuggestions({ searchResults });

  return <GameSearchSuggestionsList list={list} loading={loading} />;
};
