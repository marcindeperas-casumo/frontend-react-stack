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

export type TGameSearchResults<T = A.GameSearch_GameFragment> = {
  results: Array<T>;
  resultsCount: number;
  renderItem: (game: T) => React.ReactNode;
};
