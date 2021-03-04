// @flow
import React from "react";
import * as A from "Types/apollo";

export type TGameSearchSuggestions = {
  games: Array<A.GameSearchSuggestionsListContainerQuery_gamesList_games>,
  location: string,
  title: ?string,
  type: string,
};

export type TGameSearchResults = {
  results: Array<A.GameSearchQuery_gamesSearch_results>,
  resultsCount: number,
  renderItem: (game: A.GameRow_Game) => React.Node,
};
