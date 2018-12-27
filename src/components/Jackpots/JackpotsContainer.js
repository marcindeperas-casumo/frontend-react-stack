// @flow
import React from "react";
import { connect } from "react-redux";
import {
  jackpotIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";
import {
  subscribeJackpotUpdates,
  unsubscribeJackpotUpdates,
} from "Models/cometd";
import TrackProvider from "Components/TrackProvider";
import { GAME_LIST_IDS } from "Src/constants";
import Jackpots from "./Jackpots";

const JackpotsConnected = connect(
  state => ({
    ids: jackpotIdsSelector(state),
    title: gameListTitleSelectorFactory(GAME_LIST_IDS.CASUMO_JACKPOT_GAMES)(
      state
    ),
  }),
  dispatch => ({
    subscribeToUpdates: () => dispatch(subscribeJackpotUpdates()),
    unsubscribeFromUpdates: () => dispatch(unsubscribeJackpotUpdates()),
  })
)(Jackpots);

type Props = {};

const JackpotsContainer = (props: Props) => {
  return (
    <TrackProvider data={{ gameCategory: "Jackpots" }}>
      <JackpotsConnected {...props} />
    </TrackProvider>
  );
};

export default JackpotsContainer;
