// @flow
import React from "react";
import { connect } from "react-redux";
import { market as marketSelector } from "Models/handshake";
import { initFetchTopLists } from "Models/games";
import TopLists from "Components/TopLists/TopLists";

type Props = {};

const TopListsConnected = connect(
  state => ({
    market: marketSelector(state),
  }),
  dispatch => ({
    fetchTopLists: () => dispatch(initFetchTopLists()),
  })
)(TopLists);

const TopListsContainer = (props: Props) => {
  return <TopListsConnected {...props} />;
};

export default TopListsContainer;
