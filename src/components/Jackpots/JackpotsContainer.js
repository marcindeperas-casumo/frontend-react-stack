// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import {
  jackpotIdsSelector,
  gameListTitleSelectorFactory,
} from "Models/schema/selector";
import {
  subscribeJackpotUpdates,
  unsubscribeJackpotUpdates,
} from "Models/cometd";
import { GAME_LIST_IDS } from "Src/constants";
import Jackpots from "./Jackpots";

const connector: Connector = connect(
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
);

export default connector(Jackpots);
