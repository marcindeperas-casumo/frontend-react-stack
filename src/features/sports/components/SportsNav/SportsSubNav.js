// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Scrollable from "@casumo/cmp-scrollable";
import { Pill } from "Components/Pill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import type { SportsNavItemType } from "./types";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
};

const SportsSubNav = ({
  navItems,
  canEdit,
  onEdit,
  isSelected,
  onSelected,
}: Props) => (
  <Scrollable className="u-padding-vert--md" padding="lg" itemSpacing="default">
    {navItems.map(navItem => {
      return (
        <Flex.Item key={navItem.path} onClick={() => onSelected(navItem)}>
          <Pill
            className="u-margin-horiz"
            activeClassNames="t-background-green t-color-white"
            isActive={isSelected(navItem)}
          >
            {navItem.text}
          </Pill>
        </Flex.Item>
      );
    })}

    {canEdit && (
      <Flex.Block className="o-flex-align--center">
        <Flex justify="end" align="center" className="o-flex--1">
          <EditPillsButton
            onClick={onEdit}
            className="t-background-grey-light-2 t-color-grey"
          />
        </Flex>
      </Flex.Block>
    )}
  </Scrollable>
);

export default SportsSubNav;
