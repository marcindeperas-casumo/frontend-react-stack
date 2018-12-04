// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { connect } from "react-redux";
import { gameSelector } from "Models/schema";
import { launchGame } from "Models/games";
import {
  subscribeLiveCasinoUpdates,
  unsubscribeLiveCasinoUpdates,
} from "Models/cometd";

const LiveCasinoCardConnected = connect(
  (state, { id }) => ({ game: gameSelector(id)(state) }),
  (dispatch, { id }) => ({
    launchGame: () => dispatch(launchGame(id)),
    subscribeToUpdates: id => dispatch(subscribeLiveCasinoUpdates(id)),
    unsubscribeFromUpdates: id => dispatch(unsubscribeLiveCasinoUpdates(id)),
  })
)(LiveCasinoCard);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const LiveCasinoCardContainer = ({ id }: Props) => (
  <LiveCasinoCardConnected id={id} />
);

export default LiveCasinoCardContainer;
