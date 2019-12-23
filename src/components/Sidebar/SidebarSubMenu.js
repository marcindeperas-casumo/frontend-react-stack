// @flow
import React from "react";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import type { SidebarTranslations } from "./Sidebar";
import { SidebarRow } from "./SidebarRow";

export const SidebarSubMenu = ({
  t,
  logout,
}: {
  t: SidebarTranslations,
  logout: () => void,
}) => {
  const { navigateToKO } = useCrossCodebaseNavigation();

  return (
    <>
      <SidebarRow
        text={t.settings_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAYER_SETTINGS)}
        secondary
      />
      <SidebarRow
        text={t.play_okay_settings_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS)}
        secondary
      />
      <SidebarRow
        text={t.contact_us_link_text}
        link="mailto:hey@casumo.com"
        secondary
      />
      <SidebarRow
        text={t.play_okay_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAY_OKAY)}
        secondary
      />
      <SidebarRow
        text={t.blog_menu_text}
        link="https://www.casumo.com/blog/"
        secondary
        openNewTab
      />
      <SidebarRow
        text={t.faq_link_text}
        action={() => navigateToKO(ROUTE_IDS.FAQ)}
        secondary
      />
      <SidebarRow
        text={t.about_us_link_text}
        action={() => navigateToKO(ROUTE_IDS.ABOUT_CASUMO)}
        secondary
      />
      <SidebarRow text={t.log_out_link_text} action={logout} secondary />
    </>
  );
};
