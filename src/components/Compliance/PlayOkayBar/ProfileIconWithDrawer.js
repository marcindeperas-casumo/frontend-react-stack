//@flow
import * as React from "react";
import { useSelector } from "react-redux";
import { ReelRacesDrawerContainer as ReelRacesDrawer } from "Components/ReelRacesDrawer/ReelRacesDrawerContainer";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import { InGameDrawer } from "Components/InGameDrawer";
import { InGameAdventureWidget } from "Components/InGameAdventureWidget";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { PinnedDrawersContext } from "Components/GamePage/Contexts/drawerPinningContext";
import { MobileAndTablet, isDesktop } from "Components/ResponsiveLayout";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { SumoIcon } from "Components/SumoIcon/SumoIIcon";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import { playingSelector } from "Models/playing";
import { type PauseResumeProps } from "./PlayOkayBarContainer";
import "./ProfileIconWithDrawer.scss";

type Props = PauseResumeProps & IntercomPlayerDetailsProps;
const baseClassName = "c-profile-icon-with-drawer";

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

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      tracker.track(EVENTS.MIXPANEL_SUMOTICON_CLICKED, {});
    }
    setDrawerOpen(isOpen => !isOpen);
  };

  const isChatDisabled = isNativeByUserAgent();
  const isNative = isNativeByUserAgent();
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentReelRace = isNative ? null : currentReelRaceFromHook;

  React.useEffect(() => {
    if (isChatDisabled) {
      return;
    }

    injectIntercomScript({ playerId, email, casumoName, playerName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    registerPauseResumeGame(pauseGame, resumeGame);
  }, [pauseGame, resumeGame]);
  const reelRaceProps = {
    currentRace: currentReelRace,
  };

  const { pinnedDrawers, togglePin } = React.useContext(PinnedDrawersContext);
  React.useEffect(() => {
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
      <SumoIcon onClick={toggleDrawer} openedState={isDrawerOpen} />
      {isDrawerOpen && (
        <div
          className={`${baseClassName}__bottom-wrapper-bg u-position-absolute u-zindex--content-overlay u-width--full u-width--1/5@desktop`}
        >
          <div className="u-padding-left u-padding-left--md@desktop u-padding-right u-padding-right--none@desktop u-padding-top--md u-padding-top--none@desktop">
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
                    tracker.track(
                      EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED,
                      {}
                    );
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
        </div>
      )}
    </React.Fragment>
  );
};
