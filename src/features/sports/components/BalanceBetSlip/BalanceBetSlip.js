// @flow
import React from "react";
import { AddIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
// import Text from "@casumo/cmp-text";

export const BalanceBetSlip = () => (
  <Flex
    direction="vertical"
    align="center"
    className="o-position--fixed o-inset-bottom--none u-zindex--content-overlay"
  >
    <Flex.Item className="o-flex u-padding">
      <AddIcon size="sm" />
    </Flex.Item>
  </Flex>
);
