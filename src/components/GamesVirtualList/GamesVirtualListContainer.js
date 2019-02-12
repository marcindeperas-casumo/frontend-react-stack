// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesSelector,
  preloadFetchPlayerGames,
  playerGamesCountSelector,
} from "Models/playerGames";

const GamesVirtualListConnected = connect(
  state => ({
    rowCount: playerGamesCountSelector(state),
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
