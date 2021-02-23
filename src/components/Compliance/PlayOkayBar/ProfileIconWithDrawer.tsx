//@flow
import * as React from "react";
import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import { useCallOnce, useCrossCodebaseNavigation } from "Utils/hooks";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import { FiveMinuteBreakDrawerWidgetContainer as FiveMinuteBreakDrawerWidget } from "Components/Compliance/GGL/FiveMinuteBreakDrawerWidget/FiveMinuteBreakDrawerWidgetContainer";
import { ReelRacesDrawerWidgetContainer as ReelRacesDrawerWidget } from "Components/ReelRacesDrawerWidget/ReelRacesDrawerWidgetContainer";
// @ts-expect-error ts-migrate(1149) FIXME: File name '/Users/michalmokijewski/Projects/casumo... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../features/chat/IntercomChatServic... Remove this comment to see the full error message
  type IntercomPlayerDetailsProps,
} from "Features/chat/IntercomChatService";
import tracker from "Services/tracker";
import { MobileAndTablet, isDesktop } from "Components/ResponsiveLayout";
//@lukKowalski: enable when payments are done import { QuickDepositContainer as QuickDeposit } from "../../QuickDeposit/QuickDepositContainer";
import { SumoIcon } from "Components/SumoIcon/SumoIcon";
import {
  BlueRibbonJackpotsInGameWidgetContainer,
  useDataForBlueRibbonJackpotsWidget,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ProfileIconWithDrawer.scss' ... Remove this comment to see the full error message
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
  const { pauseGame, resumeGame } = useGameModelContext();
  const { pinnedWidgets, togglePin } = usePinnedWidgetsContext();
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  const currentRace = useCurrentReelRaceInfo();
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  useCallOnce(currentRace?.isInProgress && currentRace?.optedIn, () => {
    togglePin(DRAWERS.REEL_RACES);
  });
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

    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    injectIntercomScript({ playerId, email, casumoName, playerName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    registerPauseResumeGame(pauseGame, resumeGame);
  }, [pauseGame, resumeGame]);

  React.useEffect(() => {
    setDrawerOpen(false);
  }, [pinnedWidgets]);

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
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ jackpots: BlueRibbonJackpotEntry[]; t: Jac... Remove this comment to see the full error message */}
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
          <FiveMinuteBreakDrawerWidget
            className={`${baseClassName}__item u-padding-bottom`}
          />
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};
