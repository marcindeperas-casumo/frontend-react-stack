import { connect } from "react-redux";
import { playerCurrencySymbolSelector } from "Models/player";
import { playerIdSelector, currencySelector } from "Models/handshake";
import {
  saveLimitAction,
  depositLimitHasBeenSetSelector,
} from "Models/compliance/denmark";
import { DanishEntryOverlay } from "./DanishEntryOverlay";

export const DanishEntryOverlayContainer = connect(
  state => ({
    playerId: playerIdSelector(state),
    currencySymbol: playerCurrencySymbolSelector(state),
    isDepositLimitProperlySet: depositLimitHasBeenSetSelector(state),
    iso4217CurrencyCode: currencySelector(state),
  }),
  dispatch => ({
    saveLimit: (playerId, limit, period) =>
      dispatch(saveLimitAction(playerId, limit, period)),
  })
)(DanishEntryOverlay);
