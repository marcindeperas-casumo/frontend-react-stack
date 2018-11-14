// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";
import { launchGame } from "Reducers/games";

const LiveCasinoCardConnected = connect(
  (state, { id }) => ({ game: gameSelector(id)(state) }),
  (dispatch, { id }) => ({
    launchGame: () => dispatch(launchGame(id)),
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
