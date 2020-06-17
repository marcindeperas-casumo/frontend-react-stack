// @flow
import { connect } from "react-redux";
import { playerIdSelector, currencySelector } from "Models/handshake";
import {
  saveLimitAction,
  depositLimitHasBeenSetSelector,
} from "Models/playOkay";
import { DanishEntryOverlay } from "./DanishEntryOverlay";

export const DanishEntryOverlayContainer = connect(
  state => ({
    playerId: playerIdSelector(state),
    isDepositLimitProperlySet: depositLimitHasBeenSetSelector(state),
    iso4217CurrencyCode: currencySelector(state),
  }),
  dispatch => ({
    saveLimit: limitData => dispatch(saveLimitAction(limitData)),
  })
)(DanishEntryOverlay);
