// @flow
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  gameSearchResultsCountSelector,
  initFetchGameSearchPage,
} from "Models/gameSearch";
import { GameSearchResultsVirtualList } from "./GameSearchResultsVirtualList";

const GameSearchResultsVirtualListConnected = connect(
  createStructuredSelector({
    rowCount: gameSearchResultsCountSelector,
  }),
  {
    initFetchGameSearchPage,
  }
)(GameSearchResultsVirtualList);

type Props = {
  renderItem: Function,
  games: Array<string>,
  query: string,
};

export const GameSearchResultsVirtualListContainer = (props: Props) => (
  <GameSearchResultsVirtualListConnected {...props} />
);
