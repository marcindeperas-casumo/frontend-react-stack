// @flow
import { connect } from "react-redux";
import type { Connector } from "react-redux";
import { jackpotIdsSelector } from "Reducers/schema/selector";
import {
  subscribeJackpotUpdates,
  unsubscribeJackpotUpdates,
} from "Reducers/cometd";
import Jackpots from "./Jackpots";

const connector: Connector = connect(
  state => ({
    ids: jackpotIdsSelector(state),
  }),
  dispatch => ({
    subscribeToUpdates: () => dispatch(subscribeJackpotUpdates()),
    unsubscribeFromUpdates: () => dispatch(unsubscribeJackpotUpdates()),
  })
);

export default connector(Jackpots);
