// @flow
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesLetterTitlesSelector,
  preloadFetchPlayerGames,
  preloadFetchPlayerGamesCount,
  playerGamesLetterTitlesCountSelector,
} from "Models/playerGames";

const GamesVirtualListConnected = connect(
  createStructuredSelector({
    games: playerGamesLetterTitlesSelector,
    rowCount: playerGamesLetterTitlesCountSelector,
  }),
  {
    preloadFetchPlayerGames,
    preloadFetchPlayerGamesCount,
  }
)(GamesVirtualList);

type Props = {
  renderItem: Function,
};

export const GamesVirtualListContainer = (props: Props) => (
  <GamesVirtualListConnected {...props} />
);
