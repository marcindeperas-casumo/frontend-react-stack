// @flow
import React from "react";

import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

import type { SportsNavItemType } from "./types";

type Props = {
  navItem: SportsNavItemType,
  onClick: () => void,
};

const SportsSingleNavTab = ({ navItem, onClick }: Props) => (
  <Flex.Item className="c-sports-nav-tab o-flex" onClick={onClick}>
    <Flex align="center" justify="center" className="o-flex--1">
      {navItem.icon}
      <Text
        tag="span"
        size="xlg"
        className="u-font-weight-black u-text-align-center t-color-grey-dark-3 u-text-nowrap u-margin-left--md"
      >
        {navItem.text}
      </Text>
    </Flex>
  </Flex.Item>
);

export default SportsSingleNavTab;
