// @flow
import React from "react";

import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

import type { SportsNavItemType } from "./types";

import "./SportsNavTab.scss";

type SportsNavTabProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onClick: SportsNavItemType => *,
};

const SportsNavTab = ({ navItem, isSelected, onClick }: SportsNavTabProps) => (
  <Flex.Item
    className={classNames("c-sports-nav-tab u-padding-horiz o-flex", {
      "c-sports-nav-tab--selected": isSelected,
    })}
    onClick={() => onClick(navItem)}
  >
    <Flex
      align="center"
      justify="center"
      direction="vertical"
      className="o-flex--1"
    >
      {navItem.icon}
      <Text
        tag="span"
        size="sm"
        className="u-font-weight-black u-text-align-center t-color-grey-dark-3 u-text-nowrap"
      >
        {navItem.text}
      </Text>
    </Flex>
  </Flex.Item>
);

export default SportsNavTab;
