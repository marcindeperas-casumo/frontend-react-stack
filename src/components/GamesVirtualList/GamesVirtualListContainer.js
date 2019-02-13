// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import {
  playerGamesSelector,
  preloadFetchPlayerGames,
  playerGamesCountSelector,
  preloadPlayerGamesCount,
} from "Models/playerGames";

const GamesVirtualListConnected = connect(
  state => {
    return {
      games: playerGamesSelector(state),
      rowCount: playerGamesCountSelector(state),
    };
  },
  dispatch => ({
    preloadPlayerGamesCount: index => dispatch(preloadPlayerGamesCount()),
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
