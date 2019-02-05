// @flow
import React from "react";
import { connect } from "react-redux";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";

const GamesVirtualListConnected = connect(
  state => ({
    remoteRowsCount: 1290,
  }),
  (dispatch, { slug }) => ({
    fetchPage: () => dispatch(),
  })
)(GamesVirtualList);

type Props = {
  games: Array<string>,
  renderItem: Function,
};

const GamesVirtualListContainer = ({ games, renderItem }: Props) => (
  <GamesVirtualListConnected games={games} renderItem={renderItem} />
);

export default GamesVirtualListContainer;
