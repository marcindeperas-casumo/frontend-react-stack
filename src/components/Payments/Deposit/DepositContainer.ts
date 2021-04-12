import { connect } from "react-redux";
import { localeSelector, currencySelector } from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
} from "Models/player";
import { Deposit } from "./Deposit";

export const DepositContainer = connect(state => ({
  locale: localeSelector(state),
  currency: currencySelector(state),
  balance: playerBalanceAmountSelector(state),
  bonus: playerWalletBonusSelector(state),
}))(Deposit);
