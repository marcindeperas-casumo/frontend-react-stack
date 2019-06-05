// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import SportsIcon from "Features/sports/components/SportsIcon";
import type { SportsNavItemType } from "./types";

type Props = {
  navItem: SportsNavItemType,
  onClick: () => void,
};

const SportsSingleNavTab = ({ navItem, onClick }: Props) => (
  <div
    className="c-sports-nav-tab o-flex u-margin-left--lg u-margin-top--sm"
    onClick={onClick}
  >
    <Flex align="center" justify="center" className="o-flex--1">
      <SportsIcon {...navItem.iconProps} isActive />
      <Text
        tag="span"
        size="xlg"
        className="u-font-weight-black u-text-align-center t-color-grey-dark-3 u-text-nowrap u-margin-left--md"
      >
        {navItem.text}
      </Text>
    </Flex>
  </div>
);

export default SportsSingleNavTab;
