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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
      currency: playerCurrencySelector(state),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'number'.
      value: playerBalanceAmountSelector(state),
    }),
    bonus: bonusBalanceDisplay(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
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
