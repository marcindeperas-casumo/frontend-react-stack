// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import SportsIcon from "Features/sports/components/SportsIcon";
import type { SportsNavItemType } from "Features/sports/components/SportsNav/types";

import "./SportsNavTab.scss";

type SportsNavTabProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onClick: SportsNavItemType => *,
};

export const SportsNavTab = ({
  navItem,
  isSelected,
  onClick,
}: SportsNavTabProps) => (
  <div
    className={classNames(
      "c-sports-nav-tab u-padding-x u-padding-top--md u-padding-bottom--lg u-cursor-pointer o-flex",
      isSelected && "c-sports-nav-tab--selected"
    )}
    onClick={() => onClick(navItem)}
  >
    <Flex
      align="center"
      justify="center"
      direction="vertical"
      className="o-flex--1"
      spacing="none"
    >
      <SportsIcon {...navItem.iconProps} isActive={isSelected} />
      <Text
        tag="span"
        size="sm"
        className="u-font-weight-black u-text-align-center t-color-grey-dark-3 u-text-nowrap"
      >
        {navItem.text}
      </Text>
    </Flex>
  </div>
);

type SportsSingleNavTabProps = {
  navItem: SportsNavItemType,
  onClick: () => void,
};

export const SportsSingleNavTab = ({
  navItem,
  onClick,
}: SportsSingleNavTabProps) => (
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
