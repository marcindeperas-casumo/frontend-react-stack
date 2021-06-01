// @flex

import Flex from "@casumo/cmp-flex";
import React from "react";
import {
  EVENTS,
  ROUTE_IDS,
  LOCAL_STORAGE_GAME_LAUNCH_LOCATION,
} from "Src/constants";
import { ErrorBoundary } from "Components/ErrorBoundary";
import { Desktop } from "Components/ResponsiveLayout";
import tracker from "Services/tracker";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import {
  PlayOkayBar,
  ProfileIconWithDrawer,
} from "Components/Compliance/PlayOkayBar";
import { QuickDeposit } from "Components/Payments/QuickDeposit";
import { InGameDrawerLinks } from "Components/InGameDrawer";
import { openChatWindow } from "Features/chat/IntercomChatService";
import { get as getFromStorage } from "Lib/storage";
import "./GamePageHeader.scss";

export const GamePageHeader = () => {
  const { navigateToKO } = useCrossCodebaseNavigation();

  return (
    <Flex align="center" spacing="none" className="u-padding--md@desktop">
      <Flex.Item className="c-game-page-header__sumoticon-container bg-grey-90 bg-opacity-75">
        <ProfileIconWithDrawer />
      </Flex.Item>
      <Flex.Block>
        <Flex
          className="o-position--relative u-zindex--content-overlay bg-grey-90 bg-opacity-75 t-border-r@desktop u-padding-y@desktop u-padding-left--lg@desktop"
          align="center"
          spacing="none"
        >
          <Flex.Block className="o-flex-justify--start@desktop">
            <PlayOkayBar />
          </Flex.Block>
          <Desktop>
            <Flex.Item className="u-margin-right--5xlg u-padding-right--5xlg">
              <ErrorBoundary withoutUserFeedback>
                <QuickDeposit />
              </ErrorBoundary>
            </Flex.Item>
            <Flex.Item>
              <InGameDrawerLinks
                onLiveChatClick={() => {
                  tracker.track(EVENTS.MIXPANEL_IN_GAME_LIVE_CHAT_CLICKED, {});
                  openChatWindow();
                }}
                onExitGameClick={() => {
                  tracker.track(EVENTS.MIXPANEL_IN_GAME_EXIT_GAME_CLICKED, {});
                  const storedPreviousLocation = getFromStorage(
                    LOCAL_STORAGE_GAME_LAUNCH_LOCATION
                  );
                  if (storedPreviousLocation) {
                    //eslint-disable-next-line fp/no-mutation, no-restricted-globals
                    location.pathname = storedPreviousLocation;
                  } else {
                    navigateToKO(ROUTE_IDS.GAMES);
                  }
                }}
                showLabels={false}
              />
            </Flex.Item>
          </Desktop>
        </Flex>
      </Flex.Block>
    </Flex>
  );
};
