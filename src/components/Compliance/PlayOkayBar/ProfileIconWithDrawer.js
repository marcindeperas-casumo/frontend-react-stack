//@flow
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ChevronUpIcon } from "@casumo/cmp-icons";
import {
  playerCasumoNameSelector,
  emailSelector,
  playerNameSelector,
  playerIdSelector,
} from "Models/handshake";
import { useCrossCodebaseNavigation, useTranslationsGql } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import { type PauseResumeProps } from "./PlayOkayBarContainer";

const cmsPrefix = "root:iframe-solution:fields";

type Props = PauseResumeProps & IntercomPlayerDetailsProps;

export const ProfileIconWithDrawer = ({
  pauseGame,
  resumeGame,
  playerId,
  email,
  casumoName,
  playerName,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { t } = useTranslationsGql({
    in_game_drawer_live_chat: `${cmsPrefix}.in_game_drawer_live_chat`,
    in_game_drawer_exit_game: `${cmsPrefix}.in_game_drawer_exit_game`,
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    injectIntercomScript({ playerId, email, casumoName, playerName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            openChatWindow();
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

export const ProfileIconWithDrawerContainer = connect(state => ({
  playerId: playerIdSelector(state),
  casumoName: playerCasumoNameSelector(state),
  email: emailSelector(state),
  playerName: playerNameSelector(state),
}))(ProfileIconWithDrawer);
