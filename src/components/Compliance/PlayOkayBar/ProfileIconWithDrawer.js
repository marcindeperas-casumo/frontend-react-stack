//@flow
import React, { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import {
  useCrossCodebaseNavigation,
  useTranslationsGql,
  useMarket,
} from "Utils/hooks";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
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
import { ReelRaceIcon } from "Components/ReelRaceIcon";
import { type PauseResumeProps, type GameProps } from "./PlayOkayBarContainer";

import "./ProfileIconWithDrawer.scss";

const cmsPrefix = "root:iframe-solution:fields";

type Props = PauseResumeProps & IntercomPlayerDetailsProps & GameProps;

const bubbleTypes = Object.freeze({
  none: "none",
  profileIcon: "profileIcon",
  reelRace: "reelRace",
});

const bubbleIcons = Object.freeze({
  [bubbleTypes.none]: null,
  [bubbleTypes.profileIcon]: ProfileIcon,
  [bubbleTypes.reelRace]: ReelRaceIcon,
});

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
  const openDrawer = () => {
    tracker.track(EVENTS.MIXPANEL_SUMOTICON_CLICKED, {});
    setDrawerOpen(true);
  };
  const [isTransitionRunning, setIsTransitionRunning] = React.useState(false);
  const [primaryIconType, setPrimaryIconType] = React.useState<
    $Keys<typeof bubbleIcons>
  >(bubbleTypes.profileIcon);
  const [secondaryIconType, setSecondaryIconType] = React.useState<
    $Keys<typeof bubbleIcons>
  >(bubbleTypes.none);

  const isChatDisabled =
    market === MARKETS.nz_en ||
    (window.native
      ? window.native.nativeIntercomEnabled
      : isNativeByUserAgent());

  const transitionTimer = useTimeoutFn();

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
    if (
      currentReelRace?.isInProgress &&
      primaryIconType !== bubbleTypes.reelRace
    ) {
      setSecondaryIconType(bubbleTypes.reelRace);
      setIsTransitionRunning(true);
      transitionTimer.scheduleIn(() => {
        setIsTransitionRunning(false);
        setPrimaryIconType(bubbleTypes.reelRace);
        setSecondaryIconType(bubbleTypes.none);
      }, 1000);
    }
  }, [currentReelRace, primaryIconType, transitionTimer]);

  const PrimaryIcon = bubbleIcons[primaryIconType];
  const SecondaryIcon = bubbleIcons[secondaryIconType];

  const commonIconProps = {
    currentRace: currentReelRace,
  };

  return (
    <React.Fragment>
      <div
        onClick={openDrawer}
        className={cx(
          "c-reel-race-icon u-position-relative u-zindex--content-overlay t-background-grey-90 u-position-relative u-height--2xlg u-width--2xlg",
          "t-border-r--circle t-border--xlg t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left",
          "u-cursor--pointer",
          {
            "u-display--none": isDrawerOpen,
          }
        )}
      >
        <div
          className={cx(
            "t-border-r--circle u-height--full u-overflow-hidden u-position-relative"
          )}
        >
          {PrimaryIcon && (
            <div
              className={cx("u-height--2xlg u-width--2xlg", {
                "c-profile-icon-with-drawer__content--old": isTransitionRunning,
              })}
            >
              <PrimaryIcon {...commonIconProps} />
            </div>
          )}
          {SecondaryIcon && (
            <div
              className={cx("u-height--2xlg u-width--2xlg", {
                "c-profile-icon-with-drawer__content--next": isTransitionRunning,
              })}
            >
              <SecondaryIcon {...commonIconProps} />
            </div>
          )}
        </div>
        <ChevronDownIcon
          size="sm"
          className="c-reel-race-icon__chevron-icon t-color-black t-background-white u-position-absolute t-border-r--circle u-cursor--pointer"
        />
      </div>
      <ChevronUpIcon
        className={cx("t-color-white u-margin-left", {
          "u-display--none": !isDrawerOpen,
        })}
        onClick={() => setDrawerOpen(false)}
      />
      {isDrawerOpen && (
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
      )}
    </React.Fragment>
  );
};
