// @flow
import React from "react";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { SidebarRow } from "./SidebarRow";

export const SidebarSubMenu = ({
  settings_link_text,
  play_okay_settings_link_text,
  contact_us_link_text,
  play_okay_link_text,
  blog_menu_text,
  faq_link_text,
  about_us_link_text,
}: {
  settings_link_text: string,
  play_okay_settings_link_text: string,
  contact_us_link_text: string,
  play_okay_link_text: string,
  blog_menu_text: string,
  faq_link_text: string,
  about_us_link_text: string,
}) => {
  const { navigateToKO } = useCrossCodebaseNavigation();

  return (
    <>
      <SidebarRow
        text={settings_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAYER_SETTINGS)}
        isWhiteRow
      />
      <SidebarRow
        text={play_okay_settings_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAYER_PLAY_OKAY_SETTINGS)}
        isWhiteRow
      />
      <SidebarRow
        text={contact_us_link_text}
        link="mailto:hey@casumo.com"
        isWhiteRow
      />
      <SidebarRow
        text={play_okay_link_text}
        action={() => navigateToKO(ROUTE_IDS.PLAY_OKAY)}
        isWhiteRow
      />
      <SidebarRow
        text={blog_menu_text}
        link="https://www.casumo.com/blog/"
        isWhiteRow
        openNewTab
      />
      <SidebarRow
        text={faq_link_text}
        action={() => navigateToKO(ROUTE_IDS.FAQ)}
        isWhiteRow
      />
      <SidebarRow
        text={about_us_link_text}
        action={() => navigateToKO(ROUTE_IDS.ABOUT_CASUMO)}
        isWhiteRow
      />
    </>
  );
};
