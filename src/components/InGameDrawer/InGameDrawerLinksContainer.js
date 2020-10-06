// @flow
import React from "react";
import { EVENTS, ROUTE_IDS } from "Src/constants";
import tracker from "Services/tracker";
import { useCrossCodebaseNavigation, useTranslationsGql } from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";
import { openChatWindow } from "Features/chat/IntercomChatService";
import { InGameDrawerLinks } from "./InGameDrawerLinks";

type Props = {
  onLiveChatClick: Function,
  onExitGameClick: Function,
  classNames?: string,
};

const cmsPrefix = "root:iframe-solution:fields";

export const InGameDrawerLinksContainer = ({
  onLiveChatClick,
  onExitGameClick,
  classNames = "",
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { t } = useTranslationsGql({
    in_game_drawer_live_chat: `${cmsPrefix}.in_game_drawer_live_chat`,
    in_game_drawer_exit_game: `${cmsPrefix}.in_game_drawer_exit_game`,
  });

  const isChatDisabled = isNativeByUserAgent();
  const liveChatClick = () => {
    tracker.track(EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED, {});
    openChatWindow();
    onLiveChatClick(false);
  };
  const exitGameClick = () => {
    navigateToKO(ROUTE_IDS.TOP_LISTS);
    onExitGameClick(false);
  };

  return (
    <InGameDrawerLinks
      isChatDisabled={isChatDisabled}
      onLiveChatClick={liveChatClick}
      onExitGameClick={exitGameClick}
      classNames={classNames}
      t={t}
    />
  );
};
