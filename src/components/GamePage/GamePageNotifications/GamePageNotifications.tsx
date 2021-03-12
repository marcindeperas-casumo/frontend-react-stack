import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { BlueRibbonChristmasCampaignNotificationsContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonChristmasCampaignNotifications";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

import "./GamePageNotifications.scss";

export function GamePageNotifications() {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="c-game-page-notifications u-position-absolute u-inset-x u-margin--md u-width--1/2@desktop"
    >
      <Flex.Item>
        <ReelRaceStartingNotification />
      </Flex.Item>
      <Flex.Item>
        <BlueRibbonChristmasCampaignNotificationsContainer />
      </Flex.Item>
    </Flex>
  );
}
