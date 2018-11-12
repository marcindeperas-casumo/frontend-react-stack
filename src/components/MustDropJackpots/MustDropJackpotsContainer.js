import React from "react";
import { connect } from "react-redux";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";
import {
  isGamesHandshakeLoaded,
  isApplicationHandshakeLoaded,
} from "Reducers/handshake/selectors";
import { jackpotIdsSelector } from "Reducers/schema/selector";

const MustDropJackpotsConnected = connect(state => ({
  isFetching: !isGamesHandshakeLoaded && !isApplicationHandshakeLoaded,
  ids: jackpotIdsSelector(state),
}))(MustDropJackpots);

const MustDropJackpotsContainer = props => {
  return <MustDropJackpotsConnected {...props} />;
};

export default MustDropJackpotsContainer;
