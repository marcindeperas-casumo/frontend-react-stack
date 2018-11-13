// @flow
import React from "react";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";

const getGameData = (state, props) => ({ game: gameSelector(props.id)(state) });

const LiveCasinoCardConnected = connect(getGameData)(LiveCasinoCard);

type Props = {
  /** The slug of the game to render */
  id: string,
};

const LiveCasinoCardContainer = ({ id }: Props) => (
  <LiveCasinoCardConnected id={id} />
);

export default LiveCasinoCardContainer;
