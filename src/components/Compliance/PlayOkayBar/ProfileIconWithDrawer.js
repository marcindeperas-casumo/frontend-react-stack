//@flow
import React, { useState, useEffect } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import { useSelector } from "react-redux";
import { ReelRacesDrawerContainer as ReelRacesDrawer } from "Components/ReelRacesDrawer/ReelRacesDrawerContainer";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { ReelRaceIcon } from "Components/ReelRaceIcon";
import { playingSelector } from "Models/playing";
import { useReelRaceLeaderboardModal } from "Components/RSModal/Slots/ReelRaceLeaderboardModal/useReelRaceLeaderboardModal";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { type PauseResumeProps } from "./PlayOkayBarContainer";

import "./ProfileIconWithDrawer.scss";

type Props = PauseResumeProps & IntercomPlayerDetailsProps;

const baseClassName = "c-profile-icon-with-drawer";

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
  pauseGame,
  resumeGame,
  playerId,
  email,
  casumoName,
  playerName,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const playing = useSelector(playingSelector);

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

  const isChatDisabled = isNativeByUserAgent();
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

  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentReelRace = isNativeByUserAgent()
    ? null
    : currentReelRaceFromHook;

  useReelRaceLeaderboardModal(currentReelRace);

  useEffect(() => {
    const switchIconTo = iconType => {
      setSecondaryIconType(iconType);
      setIsTransitionRunning(true);
      transitionTimer.scheduleIn(() => {
        setIsTransitionRunning(false);
        setPrimaryIconType(iconType);
        setSecondaryIconType(bubbleTypes.none);
      }, 1000);
    };
    if (
      currentReelRace?.isInProgress &&
      primaryIconType !== bubbleTypes.reelRace
    ) {
      switchIconTo(bubbleTypes.reelRace);
    } else if (
      (!currentReelRace || currentReelRace?.endTime <= Date.now()) &&
      primaryIconType !== bubbleTypes.profileIcon
    ) {
      switchIconTo(bubbleTypes.profileIcon);
    }
  }, [currentReelRace, primaryIconType, transitionTimer]);

  const PrimaryIcon = bubbleIcons[primaryIconType];
  const SecondaryIcon = bubbleIcons[secondaryIconType];

  const commonRaceProps = {
    currentRace: currentReelRace,
  };

  return (
    <React.Fragment>
      <div
        onClick={openDrawer}
        className={cx(
          baseClassName,
          "u-position-relative u-height--3xlg u-width--3xlg",
          "t-border-r--circle u-margin-right--md u-cursor--pointer",
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
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg u-position-absolute",
                {
                  [`${baseClassName}__content--old`]: isTransitionRunning,
                }
              )}
            >
              <PrimaryIcon {...commonRaceProps} />
            </div>
          )}
          {SecondaryIcon && (
            <div
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg u-position-absolute",
                {
                  [`${baseClassName}__content--next`]: isTransitionRunning,
                }
              )}
            >
              <SecondaryIcon {...commonRaceProps} />
            </div>
          )}
        </div>
        <ChevronDownIcon
          size="sm"
          className={`${baseClassName}__chevron-icon t-color-black t-opacity-background--100 t-background-white u-position-absolute t-border-r--circle u-cursor--pointer`}
        />
      </div>
      <ChevronUpIcon
        className={cx("t-color-white u-margin-right--md u-width--3xlg", {
          "u-display--none": !isDrawerOpen,
        })}
        onClick={() => setDrawerOpen(false)}
      />
      {isDrawerOpen && (
        <div
          className={`${baseClassName}__bottom-wrapper-bg u-position-absolute u-zindex--content-overlay u-inset-x u-width--1/5@desktop`}
        >
          <div
            className={`${baseClassName}__bottom-wrapper u-width--2/3 u-width--full@mobile u-padding-bottom--2xlg o-inset-left--none@desktop u-margin-left--none@desktop`}
          >
            {currentReelRace?.isInProgress && (
              <div
                className={`${baseClassName}__bottom-wrapper-item u-width--full u-padding u-margin-bottom--sm u-margin-bottom--none@desktop u-padding-left--md@desktop`}
              >
                <ReelRacesDrawer {...commonRaceProps} />
              </div>
            )}
            <div
              className={cx(
                `${baseClassName}__bottom-wrapper-item u-inset-x t-border-r u-width--full u-margin--auto u-padding u-padding-right--none@desktop u-padding-left--none@desktop`,
                {
                  "u-margin-top": !currentReelRace?.isInProgress,
                }
              )}
            >
              <InGameDrawer
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
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
