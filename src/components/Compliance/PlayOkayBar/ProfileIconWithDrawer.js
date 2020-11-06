//@flow
import * as React from "react";
import cx from "classnames";
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
import "./ProfileIconWithDrawer.scss";
import { DRAWERS } from "Components/Sidebar/SidebarElementWrapper/constants";
import {
  BlueRibbonJackpotsInGameWidgetContainer,
  useDataForBlueRibbonJackpotsWidget,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";

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
  const { pinnedWidgets } = usePinnedWidgetsContext();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => {
    if (!isDrawerOpen) {
      tracker.track(EVENTS.MIXPANEL_SUMOTICON_CLICKED, {});
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

  const shouldShowReelRace =
    (isDesktop() && !pinnedWidgets.includes(DRAWERS.REEL_RACES)) ||
    !isDesktop();

  return (
    <React.Fragment>
      <SumoIcon onClick={toggleDrawer} openedState={isDrawerOpen} />
      {isDrawerOpen && (
        <div
          className={cx(
            `u-position-absolute u-zindex--content-overlay`,
            "o-inset-left--none o-inset-right--none o-inset-right--auto@desktop",
            "u-padding-left u-padding-left--md@desktop u-padding-right",
            "u-overflow--hidden",
            `${baseClassName}__bottom-wrapper-bg`
          )}
        >
          <div
            className={cx(
              `${baseClassName}__bottom-wrapper-bg-inner u-overflow-y--auto u-height--full u-padding-top--md u-padding-top--none@desktop`
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
