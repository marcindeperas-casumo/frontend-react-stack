// @flow
import { connect } from "react-redux";
import * as R from "ramda";
import { SideBar } from "Components/SideBar";
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

const menu = fields => {
  if (!fields) {
    return [];
  }
  return [
    {
      name: fields["settings_link_text"] || `Your settings`,
      link: `/somewhere/settings`, //TODO: link needed
    },
    {
      name: fields["play_okay_settings_link_text"] || `Play Okay Settings`,
      link: `/somewhere/settingsok`, //TODO: link needed
    },
    {
      name: fields["contact_us_link_text"] || `Email us`,
      link: `mailto:hey@casumo.com`,
    },
    // { name: fields["help_text"], link: `/somewhere/chat/` }, TODO
    {
      name: fields["play_okay_link_text"] || `Play Okay`,
      link: `/somewhere/pok`,
    }, //TODO: LINK NEEDED
    { name: fields["blog_menu_text"] || `Blog`, link: fields["blog_menu_url"] },
    { name: fields["faq_link_text"] || `FAQ`, link: `/somewhere/faq` }, //TODO: LINK NEEDED
    {
      name: fields["about_us_link_text"] || `About Casumo`,
      link: `/somewhere/about`,
    }, //TODO: link needed
    {
      name: fields["log_out_link_text"] || `Log out`,
      link: `/somewhere/logout`,
    }, //TODO: log out action
  ];
};

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
