// @flow
import { connect } from "react-redux";
import { hasMadeFirstDeposit as hasMadeFirstDepositSelector } from "Models/handshake";
import CuratedCardLoader from "Components/CuratedCardLoader/CuratedCardLoader";
import {
  subscribeDepositUpdates,
  unsubscribeDepositUpdates,
} from "Models/cometd";

type props = {
  defaultCard: string | Array<string>,
};

// (The "card" prop can be an array right now, because
// in the CMS the page-relationship selector returns an array)
const CuratedCardLoaderContainer = connect(
  (state, { card }) => ({
    hasMadeFirstDeposit: hasMadeFirstDepositSelector(state),
    defaultCard: Array.isArray(card) ? card[0] : card,
  }),
  dispatch => ({
    subscribeDepositUpdates: () => dispatch(subscribeDepositUpdates),
    unsubscribeDepositUpdates: () => dispatch(unsubscribeDepositUpdates),
  })
)(CuratedCardLoader);

export default CuratedCardLoaderContainer;
