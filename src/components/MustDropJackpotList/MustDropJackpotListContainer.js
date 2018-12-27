// @flow
import React from "react";
import { connect } from "react-redux";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";
import TrackProvider from "Components/TrackProvider";
import { GAME_LIST_IDS } from "Src/constants";
import {
  isGameListFetchedFactory,
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";

const MustDropJackpotListConnected = connect(state => ({
  isLoaded: isGameListFetchedFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
}))(MustDropJackpotList);

type Props = {};

const MustDropJackpotListContainer = (props: Props) => {
  return (
    <TrackProvider data={{ gameCategory: "Must Drop Jackpots" }}>
      <MustDropJackpotListConnected {...props} />
    </TrackProvider>
  );
};

export default MustDropJackpotListContainer;
