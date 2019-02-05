// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";

const GamesVirtualListConnected = connect(
  state => ({
    remoteRowsCount: 1290,
  }),
  (dispatch, { fetchNextPage }) => ({
    fetchNextPage: index => dispatch(fetchNextPage(index)),
  })
)(GamesVirtualList);

type Props = {
  games: Array<string>,
  renderItem: Function,
  fetchNextPage: Function,
};

const GamesVirtualListContainer = ({
  games,
  renderItem,
  fetchNextPage,
}: Props) => (
  <GamesVirtualListConnected
    games={games}
    renderItem={renderItem}
    fetchNextPage={fetchNextPage}
  />
);

export default GamesVirtualListContainer;
