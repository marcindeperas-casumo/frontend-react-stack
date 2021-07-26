import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { RealMoneyPlayRequiredNotification } from "./ReusableNotification/RealMoneyPlayRequiredNotification";
import { BlueRibbonJackpotGameNotification } from "./BlueRibbonJackpotGameNotification";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

import "./GamePageNotifications.scss";

export function GamePageNotifications() {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="c-game-page-notifications o-position--absolute u-margin--md u-width--1/2@desktop"
    >
      <ReelRaceStartingNotification />
      <BlueRibbonJackpotGameNotification />
      <RealMoneyPlayRequiredNotification />
    </Flex>
  );
}
