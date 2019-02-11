// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesSelector,
  preloadFetchPlayerGames,
} from "Models/gameSearch";

const GamesVirtualListConnected = connect(
  state => ({
    rowCount: 1089, // selector
    games: playerGamesSelector(state),
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
