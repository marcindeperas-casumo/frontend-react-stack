import * as React from "react";
import * as A from "Types/apollo";

export type TCmsContent = {
  searchSuggestionText: string;
  gameInMaintenanceText: string;
};

export type TGameSearchSuggestions = {
  games: A.GameSearchSuggestionsListContainerQuery["gamesList"]["games"];
  location: string;
  title: string | undefined;
  type: string;
};

export type TGameSearchResults = {
  results: Array<A.GameSearch_GameFragment>;
  resultsCount: number;
  renderItem: (game: A.GameSearch_GameFragment) => React.ReactNode;
};
