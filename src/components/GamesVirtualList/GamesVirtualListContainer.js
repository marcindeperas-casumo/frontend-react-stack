// @flow
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesSelector,
  preloadFetchPlayerGames,
  preloadFetchPlayerGamesCount,
  playerGamesCountSelector,
} from "Models/playerGames";

const GamesVirtualListConnected = connect(
  createStructuredSelector({
    games: playerGamesSelector,
    rowCount: playerGamesCountSelector,
  }),
  {
    preloadFetchPlayerGames,
    preloadFetchPlayerGamesCount,
  }
)(GamesVirtualList);

type Props = {
  renderItem: Function,
};

const GamesVirtualListContainer = (props: Props) => (
  <GamesVirtualListConnected {...props} />
);

export default GamesVirtualListContainer;
