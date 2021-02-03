// @flow
import { connect } from "react-redux";
import {
  hasMadeFirstDepositSelector,
  localeSelector,
  currencySelector,
} from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
} from "Models/player";
import { Deposit } from "./Deposit";

export const DepositContainer = connect(state => ({
  locale: localeSelector(state),
  currency: currencySelector(state),
  hasDeposited: hasMadeFirstDepositSelector(state),
  balance: playerBalanceAmountSelector(state),
  bonus: playerWalletBonusSelector(state),
}))(Deposit);
