// @flow
import React from "react";
import { connect } from "react-redux";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { gameSelector } from "Models/schema";
import { launchGame, updateMyList, isGameInMyListSelector } from "Models/games";
import {
  subscribeLiveCasinoUpdates,
  unsubscribeLiveCasinoUpdates,
} from "Models/cometd";

const LiveCasinoCardConnected = connect(
  (state, { id }) => ({
    game: gameSelector(id)(state),
    isInMyList: isGameInMyListSelector(id)(state),
  }),
  (dispatch, { id }) => ({
    launchGame: () => dispatch(launchGame(id)),
    onFavouriteGame: () => dispatch(updateMyList(id)),
    subscribeToUpdates: tableId =>
      dispatch(subscribeLiveCasinoUpdates(tableId)),
    unsubscribeFromUpdates: tableId =>
      dispatch(unsubscribeLiveCasinoUpdates(tableId)),
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
