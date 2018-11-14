// @flow
import React from "react";
import { connect } from "react-redux";
import { getLanguage } from "Reducers/handshake/selectors";
import TopLists from "Components/TopLists/TopLists";

type Props = {};

const TopListsConnected = connect(state => ({
  language: getLanguage(state),
}))(TopLists);

const TopListsContainer = (props: Props) => {
  return <TopListsConnected {...props} />;
};

export default TopListsContainer;
