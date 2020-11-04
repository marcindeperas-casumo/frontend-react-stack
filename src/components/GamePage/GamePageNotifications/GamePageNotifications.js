// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { BlueRibbonChristmasCampaignNotificationsContainer } from "Components/PromotionalGameLists/BlueRibbonChristmas/BlueRibbonChristmasCampaignNotifications";
import { type PauseResumeProps } from "Components/Compliance/PlayOkayBar/PlayOkayBarContainer";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

export function GamePageNotifications({
  pauseGame,
  resumeGame,
}: PauseResumeProps) {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="u-position-absolute u-inset-x u-margin--md"
    >
      <Flex.Item>
        <ReelRaceStartingNotification />
      </Flex.Item>
      <Flex.Item>
        <BlueRibbonChristmasCampaignNotificationsContainer
          pauseGame={pauseGame}
          resumeGame={resumeGame}
        />
      </Flex.Item>
    </Flex>
  );
}
