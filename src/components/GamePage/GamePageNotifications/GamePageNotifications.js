// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

export function GamePageNotifications() {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      className="u-position-absolute u-inset-x u-margin--md"
    >
      <Flex.Item>
        <ReelRaceStartingNotification />
      </Flex.Item>
    </Flex>
  );
}