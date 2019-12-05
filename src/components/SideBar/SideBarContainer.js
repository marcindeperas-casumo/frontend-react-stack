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
  balanceAmountDisplay,
  balanceBonusDisplay,
  SLUGS,
} from "Models/player";
import { SideBar } from "./SideBar";
import { generateMenu } from "./SideBar.utils";

const SideBarContainer = connect(
  state => ({
    menu: generateMenu(R.prop("fields", getPage(SLUGS.MENU)(state))),
    username: playerCasumoNameSelector(state),
    wallet: {
      cash: balanceAmountDisplay(
        playerBalanceAmountSelector(state),
        playerCurrencySelector(state),
        localeSelector(state)
      ),
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
