// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

export function GamePageNotifications() {
  return (
    <Flex
      direction="vertical"
      align="center"
      className="u-position-absolute u-inset-x u-margin"
    >
      <Flex.Item>
        <ReelRaceStartingNotification />
      </Flex.Item>
    </Flex>
  );
}
