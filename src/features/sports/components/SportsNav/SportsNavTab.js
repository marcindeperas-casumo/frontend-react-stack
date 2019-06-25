// @flow
import React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import SportsIcon from "Features/sports/components/SportsIcon";
import type { SportsNavItemType } from "./types";

import "./SportsNavTab.scss";

type SportsNavTabProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onClick: SportsNavItemType => *,
};

const SportsNavTab = ({ navItem, isSelected, onClick }: SportsNavTabProps) => (
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

export default SportsNavTab;
