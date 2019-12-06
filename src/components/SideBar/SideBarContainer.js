// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { fetchPageBySlug, getPage } from "Models/cms";
import { playerCasumoNameSelector, localeSelector } from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
  balanceBonusDisplay,
  SLUGS,
} from "Models/player";
import { formatCurrency } from "Utils";
import { SideBar } from "./SideBar";
import { generateMenu } from "./SideBar.utils";

const SideBarContainer = connect(
  state => ({
    menu: generateMenu(R.prop("fields", getPage(SLUGS.MENU)(state))),
    username: playerCasumoNameSelector(state),
    wallet: {
      cash: formatCurrency({
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
    },
  }),
  dispatch => ({
    fetchMenuPage: () => dispatch(fetchPageBySlug(SLUGS.MENU)),
    fetchPaymentsPage: () => dispatch(fetchPageBySlug(SLUGS.PAYMENTS)),
  })
)(SideBar);

export default SideBarContainer;
