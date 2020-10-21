//@flow
import React, { useState, useEffect, useContext } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import { useSelector } from "react-redux";
import cx from "classnames";
import { ReelRacesDrawerContainer as ReelRacesDrawer } from "Components/ReelRacesDrawer/ReelRacesDrawerContainer";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import { ProfileIcon } from "Components/ProfileIcon";
import { InGameDrawer } from "Components/InGameDrawer";
import { InGameAdventureWidget } from "Components/InGameAdventureWidget";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import { playingSelector } from "Models/playing";
import tracker from "Services/tracker";
import { ReelRaceIcon } from "Components/ReelRaceIcon";
import { useReelRaceLeaderboardModal } from "Components/RSModal/Slots/ReelRaceLeaderboardModal/useReelRaceLeaderboardModal";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { isDesktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
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
  const isNative = isNativeByUserAgent();
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentReelRace = isNative ? null : currentReelRaceFromHook;

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
  const reelRaceProps = {
    currentRace: currentReelRace,
  };

  const { pinnedDrawers, togglePin } = useContext(PinnedDrawersContext);
  useEffect(() => {
    setDrawerOpen(false);
  }, [pinnedDrawers]);

  const isDesktopAndUnpinnedRRDrawerAndActiveRR =
    isDesktop() &&
    !pinnedDrawers.includes(DRAWERS.REEL_RACES) &&
    currentReelRace?.isInProgress;

  const isMobileTabletAndActiveRR =
    !isDesktop() && currentReelRace?.isInProgress;

  const shouldShowReelRace =
    isDesktopAndUnpinnedRRDrawerAndActiveRR || isMobileTabletAndActiveRR;

  return (
    <React.Fragment>
      <div
        onClick={openDrawer}
        className={cx(
          baseClassName,
          "u-position-relative u-height--3xlg u-width--3xlg",
          "t-border-r--circle u-margin-right--md",
          "u-cursor--pointer u-position-absolute@mobile u-zindex--header",
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
              <PrimaryIcon {...reelRaceProps} />
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
              <SecondaryIcon {...reelRaceProps} />
            </div>
          )}
        </div>
        <ChevronDownIcon
          size="sm"
          className={`${baseClassName}__chevron-icon t-color-black t-opacity-background--100 t-background-white u-position-absolute t-border-r--circle u-cursor--pointer`}
        />
      </div>
      <Flex
        className={cx(
          `${baseClassName}__close-drawer`,
          "u-position-relative u-height--3xlg u-width--3xlg",
          "t-border-r--circle u-margin-right--md u-cursor--pointer",
          "t-color-white u-position-absolute@mobile u-zindex--header",
          {
            "u-display--none": !isDrawerOpen,
          }
        )}
        align="center"
        justify="center"
        onClick={() => setDrawerOpen(false)}
      >
        <Flex.Item>
          <ChevronUpIcon />
        </Flex.Item>
      </Flex>
      {isDrawerOpen && (
        <div
          className={cx(
            `u-position-absolute u-zindex--content-overlay`,
            "o-inset-left--none o-inset-right--none o-inset-right--auto@desktop",
            "u-padding-left u-padding-left--md@desktop u-padding-right u-padding-top--md",
            `${baseClassName}__bottom-wrapper-bg`
          )}
        >
          {shouldShowReelRace && (
            <div className={`${baseClassName}__item u-padding-bottom`}>
              <SidebarElementWrapper
                pinnable={isDesktop()}
                onPinClick={() => togglePin(DRAWERS.REEL_RACES)}
                className={`${baseClassName}__item u-margin-left--none@desktop`}
              >
                <div className={`${baseClassName}__bottom-wrapper-item`}>
                  <ReelRacesDrawer {...reelRaceProps} />
                </div>
              </SidebarElementWrapper>
            </div>
          )}
          <div className={`${baseClassName}__item u-padding-bottom`}>
            <InGameAdventureWidget />
          </div>
          <MobileAndTablet>
            <div className={`${baseClassName}__item u-padding-bottom`}>
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
          </MobileAndTablet>
        </div>
      )}
    </React.Fragment>
  );
};
