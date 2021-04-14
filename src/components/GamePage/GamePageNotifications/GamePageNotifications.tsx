import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { BlueRibbonChristmasCampaignNotificationsContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonChristmasCampaignNotifications";
import { RealMoneyPlayRequiredNotification } from "./ReusableNotification/RealMoneyPlayRequiredNotification";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

import "./GamePageNotifications.scss";

export function GamePageNotifications() {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="c-game-page-notifications o-position--absolute o-inset-x--none u-margin--md u-width--1/2@desktop"
    >
      <ReelRaceStartingNotification />
      <BlueRibbonChristmasCampaignNotificationsContainer />
      <RealMoneyPlayRequiredNotification />
    </Flex>
  );
}
