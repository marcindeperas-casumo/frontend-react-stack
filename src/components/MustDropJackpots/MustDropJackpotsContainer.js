import React from "react";
import { connect } from "react-redux";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";
import { GAME_LIST_IDS } from "Src/constants";
import {
  isGameListFetchedFactory,
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Reducers/schema/selector";

const MustDropJackpotsConnected = connect(state => ({
  isLoaded: isGameListFetchedFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
}))(MustDropJackpots);

const MustDropJackpotsContainer = props => {
  return <MustDropJackpotsConnected {...props} />;
};

export default MustDropJackpotsContainer;
