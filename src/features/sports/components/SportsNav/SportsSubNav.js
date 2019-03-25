// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Scrollable from "@casumo/cmp-scrollable";
import { Pill } from "Components/Pill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import type { SportsNavItemType } from "./types";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: (SportsNavItemType, boolean) => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
};

type SportsSubNavItemProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onSelected: () => void,
};

const SportsSubNavItem = (props: SportsSubNavItemProps) => (
  <Flex.Item
    key={props.navItem.path}
    onClick={props.onSelected}
    className="o-flex__item-fixed-size u-margin-vert--md "
  >
    <Pill
      inactiveClassNames="u-drop-shadow t-background-grey-light-3 t-color-grey-dark-1"
      activeClassNames="u-drop-shadow t-background-green t-color-white"
      isActive={props.isSelected}
    >
      {props.navItem.text}
    </Pill>
  </Flex.Item>
);

const SportsSubNav = ({
  navItems,
  canEdit,
  onEdit,
  isSelected,
  onSelected,
}: Props) => {
  const allNavItem = {
    text: <DictionaryTerm termKey="sports-sub-nav.all" />,
    path: navItems[0].parentPath || "",
    key: "all",
    canEdit: false,
  };

  return (
    <Scrollable
      className="t-background-grey-light-2 u-margin-top--sm"
      padding={{ default: "lg", tablet: "3xlg" }}
      itemSpacing="default"
    >
      <SportsSubNavItem
        navItem={allNavItem}
        onSelected={() => onSelected(allNavItem)}
        isSelected={isSelected(allNavItem, false)}
      />
      {navItems.map(navItem => {
        return (
          <SportsSubNavItem
            key={navItem.path}
            navItem={navItem}
            onSelected={() => onSelected(navItem)}
            isSelected={isSelected(navItem, false)}
          />
        );
      })}

      {canEdit && (
        <Flex.Block className="o-flex-align--center u-margin-left--md">
          <Flex justify="end" align="center" className="o-flex--1">
            <EditPillsButton
              onClick={onEdit}
              className="t-background-grey-light-3 t-color-grey u-drop-shadow"
            />
          </Flex>
        </Flex.Block>
      )}
    </Scrollable>
  );
};

export default SportsSubNav;
