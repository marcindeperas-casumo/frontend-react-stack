// @flow
import React from "react";
import * as R from "ramda";
import type { CellRendererParams } from "react-virtualized";
import {
  AllItem,
  NavItem,
  EditItem,
} from "Features/sports/components/SportsNav/SportsSubNav/SportsSubNavItems";
import ScrollablePaginated from "Components/ScrollablePaginated";
import {
  sportsPagerButtonRenderer,
  type SportsNavItemType,
  type LiveState,
  type Labels,
} from "Features/sports/components/SportsNav";

export type SportsSubNavProps = {
  navItems: SportsNavItemType[],
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  cacheBuster: string,
  labels: Labels,
  liveState: LiveState,
};

type ItemType = "all" | "nav" | "edit";

type RenderItemArgs = {
  navItemTypes: ItemType[],
  props: SportsSubNavProps,
  isLiveActive: boolean,
};

const renderItem = ({ props, navItemTypes, isLiveActive }: RenderItemArgs) => ({
  columnIndex,
  style,
}: CellRendererParams) => {
  const navItem = props.navItems[columnIndex - 1];
  const navItemType = navItemTypes[columnIndex];
  const itemProps = { ...props, isLiveActive, navItem };

  const renderedComponent = R.cond([
    [R.equals("all"), () => <AllItem {...itemProps} />],
    [R.equals("nav"), () => <NavItem {...itemProps} />],
    [R.equals("edit"), () => <EditItem {...itemProps} />],
    [R.T, () => "null"],
  ])(navItemType);

  return (
    <div key={columnIndex} style={style}>
      {renderedComponent}
    </div>
  );
};

export const SportsSubNav = (props: SportsSubNavProps) => {
  const [isLiveActive] = props.liveState;
  const navItemTypes = ["all", ...props.navItems.map(() => "nav"), "edit"];
  const isNavEmpty = !props.navItems || props.navItems.length === 0;

  if (isNavEmpty) {
    return null;
  }

  return (
    <div>
      <div className="u-margin-left u-margin-right t-border-top t-border-width--lg t-border--current-color t-color-white" />
      <ScrollablePaginated
        className="c-sports-nav-paginated"
        columnCount={navItemTypes.length}
        cellRenderer={renderItem({ props, navItemTypes, isLiveActive })}
        height={64}
        buttonRenderer={sportsPagerButtonRenderer}
        cacheBuster={props.cacheBuster}
      />
    </div>
  );
};
