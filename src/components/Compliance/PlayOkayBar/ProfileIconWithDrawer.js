//@flow
import * as React from "react";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { isNativeByUserAgent } from "GameProviders";
import { ROUTE_IDS, EVENTS } from "Src/constants";
import { InGameDrawer } from "Components/InGameDrawer";
import { InGameAdventureWidget } from "Components/InGameAdventureWidget";
import {
  useGameModelContext,
  usePinnedWidgetsContext,
} from "Components/GamePage/Contexts";
import {
  injectIntercomScript,
  registerPauseResumeGame,
  openChatWindow,
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
import { MobileAndTablet, isDesktop } from "Components/ResponsiveLayout";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { SumoIcon } from "Components/SumoIcon/SumoIcon";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import {
  BlueRibbonJackpotsInGameWidgetContainer,
  useDataForBlueRibbonJackpotsWidget,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
// eslint-disable-next-line import/no-duplicates
import { animation_duration } from "./ProfileIconWithDrawer.scss";
// eslint-disable-next-line import/no-duplicates
import "./ProfileIconWithDrawer.scss";

type Props = IntercomPlayerDetailsProps;
const baseClassName = "c-profile-icon-with-drawer";

export const ProfileIconWithDrawer = ({
  playerId,
  email,
  casumoName,
  playerName,
}: Props) => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const blueRibbonJackpotsWidgetData = useDataForBlueRibbonJackpotsWidget();
  const currentRace = useCurrentReelRaceInfo();
  const { pauseGame, resumeGame } = useGameModelContext();
  const { pinnedWidgets, togglePin } = usePinnedWidgetsContext();
  const animationDuration = Number(animation_duration);

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      tracker.track(EVENTS.MIXPANEL_IN_GAME_SUMOTICON_CLICKED, {});
    }
    setDrawerOpen(isOpen => !isOpen);
  };

  const isChatDisabled = isNativeByUserAgent();

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

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pinnedWidgets]);

  React.useEffect(() => {
    if (currentRace?.isInProgress && currentRace?.optedIn) {
      togglePin(DRAWERS.REEL_RACES);
    }
  }, [currentRace, togglePin]);

  const shouldShowReelRace =
    (isDesktop() && !pinnedWidgets.includes(DRAWERS.REEL_RACES)) ||
    !isDesktop();

  return (
    <React.Fragment>
      <SumoIcon onClick={toggleDrawer} openedState={isDrawerOpen} />
      <MobileAndTablet>
        <CSSTransition
          in={isDrawerOpen}
          unmountOnExit
          timeout={animationDuration}
          className={cx(
            `${baseClassName}__animated-drawer-overlay`,
            `u-position-absolute u-zindex--content-overlay`
          )}
        >
          <div className="overlay"></div>
        </CSSTransition>
      </MobileAndTablet>
      <CSSTransition
        in={isDrawerOpen}
        unmountOnExit
        timeout={animationDuration}
        className={cx(
          `${baseClassName}__animated-drawer`,
          `u-position-absolute u-zindex--content-overlay t-opacity-background--100`,
          "o-inset-left--none o-inset-right--none o-inset-right--auto@desktop",
          "u-padding-left u-padding-left--md@desktop u-padding-right",
          "u-overflow--hidden"
        )}
      >
        <div
          className={cx(
            `${baseClassName}__animated-drawer-inner u-overflow-y--auto u-height--full u-padding-top--md u-padding-top--none@desktop`
          )}
        >
          <div className={`${baseClassName}__item u-padding-bottom`}>
            <BlueRibbonJackpotsInGameWidgetContainer
              {...blueRibbonJackpotsWidgetData}
            />
          </div>
          {shouldShowReelRace && (
            <ReelRacesDrawerWidget
              className={`${baseClassName}__item u-padding-bottom u-padding-top--md@mobile`}
            />
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
                  tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
                  navigateToKO(ROUTE_IDS.TOP_LISTS);
                  setDrawerOpen(false);
                }}
              />
            </div>
          </MobileAndTablet>
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};
