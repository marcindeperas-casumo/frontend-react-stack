// @flow
import { connect } from "react-redux";
import { playerCasumoNameSelector, localeSelector } from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { formatCurrency } from "Utils";
import { logout } from "Models/app";
import { Sidebar } from "./Sidebar";

const balanceBonusDisplay = (
  value: number,
  currency: string,
  bonusText: string,
  locale: string
) => {
  if (!value) {
    return null;
  } else {
    return `+${formatCurrency({ locale, currency, value })} ${bonusText}`;
  }
};

const SidebarContainer = connect(
  state => ({
    username: playerCasumoNameSelector(state),
    wallet: formatCurrency({
      locale: localeSelector(state),
      currency: playerCurrencySelector(state),
      value: playerBalanceAmountSelector(state),
    }),
    bonus: balanceBonusDisplay(
      playerWalletBonusSelector(state),
      playerCurrencySelector(state),
      playerBonusTextSelector(state),
      localeSelector(state)
    ),
  }),
  {
    logout,
  }
)(Sidebar);

export default SidebarContainer;
