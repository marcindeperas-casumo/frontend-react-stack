// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesSelector,
  preloadFetchPlayerGames,
  startIndexSelector,
} from "Models/gameSearch";

const GamesVirtualListConnected = connect(
  state => ({
    rowCount: 1088, // selector
    games: playerGamesSelector(state),
    startIndexCursor: startIndexSelector(state),
  }),
  dispatch => ({
    fetchNextPage: index => dispatch(preloadFetchPlayerGames(index)),
  })
)(GamesVirtualList);

type Props = {
  renderItem: Function,
};

const GamesVirtualListContainer = (props: Props) => (
  <GamesVirtualListConnected {...props} />
);

export default GamesVirtualListContainer;
