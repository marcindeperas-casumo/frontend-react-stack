// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { CloseIcon } from "@casumo/cmp-icons";

export function ReelRaceStartingNotification() {
  return (
    <Flex
      direction="horizontal"
      className="u-padding u-padding-x--md t-background-white t-border-r"
      align="stretch"
    >
      <Flex.Item>Progress</Flex.Item>
      <Flex.Block className="u-margin-right--3xlg">
        <Text tag="div" className="t-color-black u-font-weight-bold">
          Get Ready
        </Text>
        <Text tag="div" className="t-color-grey-50">
          Reel Race is starting
        </Text>
      </Flex.Block>
      <Flex.Item>
        <div className="t-border-r--circle t-background-grey-0 u-padding">
          <CloseIcon className="t-color-black" />
        </div>
      </Flex.Item>
    </Flex>
  );
}
