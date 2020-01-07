// @flow
import React from "react";
import { connect } from "react-redux";
import { marketSelector } from "Models/handshake";
import { initFetchTopLists, isGameListLoaded } from "Models/games";
import TopLists from "Components/TopLists/TopLists";

type Props = {};

const TopListsConnected = connect(
  state => ({
    market: marketSelector(state),
    isGameListLoaded: isGameListLoaded(state),
  }),
  dispatch => ({
    // __FIX__
    fetchTopLists: () => {},
  })
)(TopLists);

const TopListsContainer = (props: Props) => {
  return <TopListsConnected {...props} />;
};

export default TopListsContainer;
