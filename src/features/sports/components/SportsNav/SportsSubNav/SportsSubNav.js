// @flow
import React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "react-virtualized";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { Pill } from "Components/Pill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  sportsPagerButtonRenderer,
  type SportsNavItemType,
  type LiveState,
  type Labels,
} from "Features/sports/components/SportsNav";

type SportsSubNavItemProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onSelected: () => void,
  isLiveActive: boolean,
};

const SportsSubNavItem = (props: SportsSubNavItemProps) => (
  <div
    key={props.navItem.path}
    onClick={props.onSelected}
    className="u-margin-y--md u-margin-x--sm"
  >
    <Pill
      inactiveClassNames="u-drop-shadow t-background-grey-light-3 t-color-grey-dark-1"
      activeClassNames={`u-drop-shadow t-background-${
        props.isLiveActive ? "red" : "green"
      } t-color-white`}
      isActive={props.isSelected}
    >
      {props.navItem.text}
    </Pill>
  </div>
);

const renderAllNavItem = (props: Props) => ({ style }: CellRendererParams) => {
  const allNavItem = {
    text: props.labels.all,
    path: props.navItems[0].parentPath || "",
    key: "all",
    canEdit: false,
  };

  const [isLiveActive] = props.liveState;

  return (
    <div style={style}>
      <div className="u-margin-left--md u-margin-y--md">
        <SportsSubNavItem
          navItem={allNavItem}
          onSelected={() => props.onSelected(allNavItem)}
          isSelected={props.isSelected(allNavItem, false)}
          isLiveActive={isLiveActive}
        />
      </div>
    </div>
  );
};

const renderEditButton = (props: Props) => ({ style }: CellRendererParams) => (
  <div style={style}>
    <div className="u-margin--md u-margin-left--sm">
      {props.canEdit && (
        <EditPillsButton
          onClick={props.onEdit}
          className="t-background-grey-light-3 t-color-grey u-drop-shadow"
        />
      )}
    </div>
  </div>
);

const renderItem = (props: Props) => (isLiveActive: boolean) => ({
  columnIndex,
  style,
}: CellRendererParams) => {
  if (columnIndex === 0) {
    return renderAllNavItem(props)({ style });
  }

  const navItem = props.navItems[columnIndex - 1];

  if (!navItem) {
    return renderEditButton(props)({ style });
  }

  return (
    <div style={style}>
      <SportsSubNavItem
        key={navItem.path}
        navItem={navItem}
        onSelected={() => props.onSelected(navItem)}
        isSelected={props.isSelected(navItem, false)}
        isLiveActive={isLiveActive}
      />
    </div>
  );
};

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: (SportsNavItemType, boolean) => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  cacheBuster: string,
  labels: Labels,
  liveState: LiveState,
};

export const SportsSubNav = (props: Props) => {
  const tabCount = props.navItems.length;
  const buttonCount = 2; // include "all" pill to prepend, edit button to append
  const columnCount = tabCount + buttonCount;
  const [isLiveActive] = props.liveState;

  return (
    <div
      className={classNames(
        "u-margin-top--sm",
        isLiveActive
          ? "t-background-orange-light-3"
          : "t-background-grey-light-2"
      )}
    >
      <ScrollablePaginated
        className="c-sports-nav-paginated"
        columnCount={columnCount}
        cellRenderer={renderItem(props)(isLiveActive)}
        height={64}
        buttonRenderer={sportsPagerButtonRenderer}
        cacheBuster={props.cacheBuster}
      />
    </div>
  );
};
