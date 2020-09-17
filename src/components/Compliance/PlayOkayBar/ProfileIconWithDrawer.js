//@flow
import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@casumo/cmp-icons";
import {
  useCrossCodebaseNavigation,
  useTranslationsGql,
  useMarket,
} from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, MARKETS, EVENTS } from "Src/constants";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
// ToDo to enable once quick deposit is finished import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { calculateProgress } from "Models/reelRaces";
import { type PauseResumeProps, type GameProps } from "./PlayOkayBarContainer";

import "./ProfileIconWithDrawer.scss";

const cmsPrefix = "root:iframe-solution:fields";

type Props = PauseResumeProps & IntercomPlayerDetailsProps & GameProps;

export const ProfileIconWithDrawer = ({
  slug,
  pauseGame,
  resumeGame,
  playerId,
  email,
  casumoName,
  playerName,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const { market } = useMarket();
  const { t } = useTranslationsGql({
    in_game_drawer_live_chat: `${cmsPrefix}.in_game_drawer_live_chat`,
    in_game_drawer_exit_game: `${cmsPrefix}.in_game_drawer_exit_game`,
  });

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [progress, setProgess] = useState(0);

  const isChatDisabled =
    market === MARKETS.nz_en ||
    (window.native
      ? window.native.nativeIntercomEnabled
      : isNativeByUserAgent());

  useEffect(() => {
    if (isChatDisabled) {
      return;
    }

    injectIntercomScript({ playerId, email, casumoName, playerName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    registerPauseResumeGame(pauseGame, resumeGame);
  }, [pauseGame, resumeGame]);

  const currentReelRace = useCurrentReelRaceInfo(slug);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgess(
        parseInt(
          100 *
            calculateProgress(
              currentReelRace?.startTime,
              currentReelRace?.endTime
            )
        )
      );
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReelRace !== null]);

  const iconToShow =
    currentReelRace && Date.now() >= currentReelRace.startTime ? (
      `${currentReelRace.position} / ${currentReelRace.remainingSpins} / ${progress}`
    ) : (
      <ProfileIcon
        onClick={() => {
          tracker.track(EVENTS.MIXPANEL_SUMOTICON_CLICKED, {});
          setDrawerOpen(true);
        }}
      />
    );
  console.log("....pio...", { currentReelRace });

  return isDrawerOpen ? (
    <React.Fragment>
      <ChevronUpIcon
        className="t-color-white u-margin-left"
        onClick={() => setDrawerOpen(false)}
      />
      <div className="c-profile-icon-with-drawer u-position-fixed u-zindex--content-overlay u-inset-x t-background-grey-90 t-border-r u-width--2/3 u-margin--auto">
        {/* TODO to enable once quick deposit is finished <QuickDeposit pauseGame={pauseGame} resumeGame={resumeGame} /> */}
        <InGameDrawer
          t={t}
          isChatDisabled={isChatDisabled}
          onLiveChatClick={() => {
            tracker.track(EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED, {});
            openChatWindow();
            setDrawerOpen(false);
          }}
          onExitGameClick={() => {
            navigateToKO(ROUTE_IDS.TOP_LISTS);
            setDrawerOpen(false);
          }}
        />
      </div>
    </React.Fragment>
  ) : (
    iconToShow
  );
};
