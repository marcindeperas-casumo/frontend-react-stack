//@flow
import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@casumo/cmp-icons";
import { useCrossCodebaseNavigation, useTranslationsGql } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import {
  injectIntercomScript,
  registerPauseResumeGame,
} from "Features/chat/IntercomChatService";
import { type PauseResumeProps } from "./PlayOkayBarContainer";

const cmsPrefix = "root:iframe-solution:fields";

export const ProfileDrawerContainer = ({
  pauseGame,
  resumeGame,
}: PauseResumeProps) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { t } = useTranslationsGql({
    in_game_drawer_live_chat: `${cmsPrefix}.in_game_drawer_live_chat`,
    in_game_drawer_exit_game: `${cmsPrefix}.in_game_drawer_exit_game`,
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    injectIntercomScript();
  }, []);

  useEffect(() => {
    registerPauseResumeGame(pauseGame, resumeGame);
  }, [pauseGame, resumeGame]);

  return isDrawerOpen ? (
    <React.Fragment>
      <ChevronUpIcon
        className="t-color-white u-margin-left"
        onClick={() => setDrawerOpen(false)}
      />
      <div
        style={{ top: "var(--play-okay-bar-height, 48px)" }}
        className="u-position-fixed u-zindex--content-overlay u-inset-x"
      >
        <InGameDrawer
          t={t}
          onLiveChatClick={() => {
            window.Intercom("show");
          }}
          onExitGameClick={() => {
            navigateToKO(ROUTE_IDS.TOP_LISTS);
          }}
        />
      </div>
    </React.Fragment>
  ) : (
    <ProfileIcon onClick={() => setDrawerOpen(true)} />
  );
};
