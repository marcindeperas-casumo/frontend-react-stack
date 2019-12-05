// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { SideBar, menu } from "Components/SideBar";
import { fetchPageBySlug, getPage } from "Models/cms";
import { playerCasumoNameSelector } from "Models/handshake";
import {
  playerBalanceAmountSelector,
  playerWalletBonusSelector,
  playerCurrencySelector,
  playerBonusTextSelector,
  balanceAmountDisplay,
  balanceBonusDisplay,
  SLUGS,
} from "Models/player";

export const SideBarContainer = connect(
  state => ({
    menu: menu(R.prop("fields", getPage(SLUGS.MENU)(state))),
    username: playerCasumoNameSelector(state),
    wallet: {
      cash: balanceAmountDisplay(
        playerBalanceAmountSelector(state),
        playerCurrencySelector(state)
      ),
      bonus: balanceBonusDisplay(
        playerWalletBonusSelector(state),
        playerCurrencySelector(state),
        playerBonusTextSelector(state)
      ),
    },
  }),
  dispatch => ({
    fetchMenuPage: dispatch(fetchPageBySlug(SLUGS.MENU)),
    fetchPaymentsPage: dispatch(fetchPageBySlug(SLUGS.PAYMENTS)),
  })
)(SideBar);
