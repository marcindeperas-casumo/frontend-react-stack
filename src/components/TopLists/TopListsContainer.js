// @flow
import React from "react";
import { connect } from "react-redux";
import { market as marketSelector } from "Models/handshake";
import TopLists from "Components/TopLists/TopLists";

type Props = {};

const TopListsConnected = connect(state => ({
  market: marketSelector(state),
}))(TopLists);

const TopListsContainer = (props: Props) => {
  return <TopListsConnected {...props} />;
};

export default TopListsContainer;
