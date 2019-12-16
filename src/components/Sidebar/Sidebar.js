// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { useCrossCodebaseNavigation, useTranslations } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { CasumoLogo, IconProfile, IconWallet, IconCherry } from "./icons";
import { SidebarRow } from "./SidebarRow";
import { SidebarSubMenu } from "./SidebarSubMenu";
import "./Sidebar.scss";

export type SidebarTranslations = ?{
  game_browser_link_text: string,
  settings_link_text: string,
  play_okay_settings_link_text: string,
  contact_us_link_text: string,
  play_okay_link_text: string,
  blog_menu_text: string,
  faq_link_text: string,
  about_us_link_text: string,
};

type Props = {
  username: string,
  wallet: string,
  bonus: string,
};

export const Sidebar = (props: Props) => {
  const { username, wallet, bonus } = props;
  const { navigateToKO } = useCrossCodebaseNavigation();

  const t = useTranslations<SidebarTranslations>("mobile.menu-2");
  useTranslations("features.payments");

  return (
    <div className="t-color-white u-font-weight-bold">
      <ul className="c-sidebar__nav u-margin--none u-padding--none u-font">
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
          text={t?.game_browser_link_text}
          Icon={IconCherry}
          isSelected={true}
          action={() => navigateToKO(ROUTE_IDS.TOP_LISTS)}
        />

        <SidebarSubMenu {...t} />
      </ul>
    </div>
  );
};
