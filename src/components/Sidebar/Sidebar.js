// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { ROUTE_IDS } from "Src/constants";
import ReelRaceWidget from "Components/ReelRaceWidget";
import {
  useCrossCodebaseNavigation,
  useTranslations,
  useIsScreenMinimumTablet,
} from "Utils/hooks";
import { CasumoLogo, IconProfile, IconWallet, IconCherry } from "./icons";
import { SidebarRow } from "./SidebarRow";
import { SidebarSubMenu } from "./SidebarSubMenu";
import { SidebarIconClose } from "./SidebarIconClose";
import "./Sidebar.scss";

export type SidebarTranslations = {
  game_browser_link_text: string,
  settings_link_text: string,
  play_okay_settings_link_text: string,
  contact_us_link_text: string,
  play_okay_link_text: string,
  blog_menu_text: string,
  faq_link_text: string,
  about_us_link_text: string,
  log_out_link_text: string,
};

type Props = {
  username: string,
  wallet: string,
  bonus: string,
  logout: () => void,
};

export const Sidebar = (props: Props) => {
  const { username, wallet, bonus, logout } = props;
  const { navigateToKO } = useCrossCodebaseNavigation();
  const isSidebarFixed = useIsScreenMinimumTablet();

  const t = useTranslations<SidebarTranslations>("mobile.menu-2");
  useTranslations("features.payments");

  if (!t) {
    return null;
  }

  return (
    <div
      className={classNames(
        "c-sidebar u-height--screen u-overflow-y--auto t-color-white u-font u-font-weight-bold",
        isSidebarFixed
          ? "c-sidebar--fixed u-position-relative"
          : "u-width--full u-position-absolute"
      )}
    >
      <SidebarIconClose />
      <ul className="u-margin--none u-padding--none">
        <li className="c-sidebar__logo t-background-plum">
          <a href="#top" onClick={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}>
            <Flex align="center" justify="center" className="u-height--full">
              <CasumoLogo
                className="t-color-turquoise"
                data-test-id="sidebar-logo"
              />
            </Flex>
          </a>
        </li>
        <SidebarRow
          text={username}
          Icon={IconProfile}
          action={() => navigateToKO(ROUTE_IDS.PLAYER_DASHBOARD)}
        />
        <SidebarRow
          text={wallet}
          label={bonus}
          Icon={IconWallet}
          action={() => navigateToKO(ROUTE_IDS.CASH_DEPOSIT)}
        />
        <SidebarRow
          text={t.game_browser_link_text}
          Icon={IconCherry}
          action={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
          selected
        />
        <ReelRaceWidget />
        <SidebarSubMenu t={t} logout={logout} />
      </ul>
    </div>
  );
};
