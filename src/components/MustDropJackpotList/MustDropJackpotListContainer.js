import React from "react";
import { connect } from "react-redux";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";
import { GAME_LIST_IDS } from "Src/constants";
import {
  isGameListFetchedFactory,
  mustDropJackpotsIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema/selector";

const MustDropJackpotListConnected = connect(state => ({
  isLoaded: isGameListFetchedFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
  ids: mustDropJackpotsIdsSelector(state),
  title: gameListTitleSelectorFactory(GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES)(
    state
  ),
}))(MustDropJackpotList);

const MustDropJackpotListContainer = props => {
  return <MustDropJackpotListConnected {...props} />;
};

export default MustDropJackpotListContainer;