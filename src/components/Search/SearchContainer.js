// @flow
import React from "react";
import { connect } from "react-redux";
import Search from "Components/Search/Search";

const SearchConnected = connect(state => ({
  isLoaded: true,
}))(Search);

type Props = {};

const SearchContainer = (props: Props) => {
  return <SearchConnected {...props} />;
};

export default SearchContainer;
