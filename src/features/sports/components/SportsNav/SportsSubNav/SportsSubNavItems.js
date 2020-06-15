// @flow
import React from "react";
import { Pill } from "Components/Pill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  type Labels,
  type SportsNavItemType,
} from "Features/sports/components/SportsNav";

type FilterItemProps = {
  isSelected: (SportsNavItemType, ?boolean) => boolean,
  onSelected: SportsNavItemType => void,
  isLiveActive: boolean,
};

type NavItemProps = FilterItemProps & {
  navItem: SportsNavItemType,
};

export const NavItem = (props: NavItemProps) => (
  <div
    onClick={() => props.onSelected(props.navItem)}
    className="u-margin-y--md u-margin-x--sm"
  >
    <Pill
      inactiveClassNames="t-elevation--10 t-background-grey-0 t-color-grey-70"
      activeClassNames={`t-background-${
        props.isLiveActive ? "red-30" : "purple-50"
      } t-color-white`}
      isActive={props.isSelected(props.navItem)}
    >
      {props.navItem.text}
    </Pill>
  </div>
);

type AllItemProps = FilterItemProps & {
  labels: Labels,
  navItems: SportsNavItemType[],
};

export const AllItem = (props: AllItemProps) => {
  const allNavItem = {
    text: props.labels.all,
    path: props.navItems[0].parentPath || "",
    parentPath: props.navItems[0].parentPath || "",
    key: "all",
    canEdit: false,
  };
  return (
    <div className="u-margin-left--md u-margin-y--md">
      <NavItem
        navItem={allNavItem}
        onSelected={() => props.onSelected(allNavItem)}
        isSelected={() => props.isSelected(allNavItem)}
        isLiveActive={props.isLiveActive}
      />
    </div>
  );
};

type EditItemProps = {
  canEdit: boolean,
  onEdit: any => any,
  isLiveActive: boolean,
};

export const EditItem = ({ canEdit, onEdit, isLiveActive }: EditItemProps) => (
  <div className="u-margin--md u-margin-left--sm">
    {canEdit && !isLiveActive && <EditPillsButton onClick={onEdit} />}
  </div>
);
