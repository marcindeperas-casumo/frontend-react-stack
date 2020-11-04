// @flow
import React from "react";
import { useTranslationsGql } from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";
import { InGameDrawerLinks } from "./InGameDrawerLinks";

type Props = {
  showLabels?: boolean,
  onLiveChatClick: () => void,
  onExitGameClick: () => void,
  className?: string,
};

const cmsPrefix = "root:iframe-solution:fields";

export const InGameDrawerLinksContainer = ({
  showLabels,
  onLiveChatClick,
  onExitGameClick,
  className = "",
}: Props) => {
  const { t } = useTranslationsGql({
    in_game_drawer_live_chat: `${cmsPrefix}.in_game_drawer_live_chat`,
    in_game_drawer_exit_game: `${cmsPrefix}.in_game_drawer_exit_game`,
  });

  const isChatDisabled = isNativeByUserAgent();

  return (
    <InGameDrawerLinks
      isChatDisabled={isChatDisabled}
      onLiveChatClick={onLiveChatClick}
      onExitGameClick={onExitGameClick}
      className={className}
      showLabels={showLabels}
      t={t}
    />
  );
};
