// @flow
import React from "react";
import { connect } from "react-redux";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";
import TrackProvider from "Components/TrackProvider";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import {
  isGameListFetchedFactory,
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema";
import { initFetchTopLists } from "Models/games";

const MustDropJackpotListConnected = connect(
  state => ({
    areGamesLoaded: isGameListFetchedFactory(
      GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES
    )(state),
    ids: mustDropJackpotsIdsSelector(state),
    title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
      state
    ),
  }),
  { initFetchTopLists }
)(MustDropJackpotList);

type Props = {};

const MustDropJackpotListContainer = (props: Props) => {
  return (
    <TrackProvider
      data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Page" }}
    >
      <MustDropJackpotListConnected {...props} />
    </TrackProvider>
  );
};

export default MustDropJackpotListContainer;
