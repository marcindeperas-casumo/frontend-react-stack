// @flow
import { connect } from "react-redux";
import { playerCasumoNameSelector, localeSelector } from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
} from "Models/player";
import { formatCurrency, bonusBalanceDisplay } from "Utils";
import { appManualLogoutInit as logout } from "Models/app";
import { Sidebar } from "./Sidebar";

const SidebarContainer = connect(
  state => ({
    username: playerCasumoNameSelector(state),
    wallet: formatCurrency({
      locale: localeSelector(state),
      currency: playerCurrencySelector(state),
      value: playerBalanceAmountSelector(state),
    }),
    bonus: bonusBalanceDisplay(
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
