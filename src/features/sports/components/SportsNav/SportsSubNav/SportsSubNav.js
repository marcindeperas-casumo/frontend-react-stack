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

export type SportsSubNavProps = {
  navItems: Array<SportsNavItemType>,
  isSelected: (SportsNavItemType, boolean) => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  cacheBuster: string,
  labels: Labels,
  liveState: LiveState,
};

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

export class SportsSubNav extends React.Component<SportsSubNavProps> {
  renderAllNavItem = ({ style }: CellRendererParams) => {
    const allNavItem = {
      text: this.props.labels.all,
      path: this.props.navItems[0].parentPath || "",
      key: "all",
      canEdit: false,
    };

    const [isLiveActive] = this.props.liveState;

    return (
      <div style={style}>
        <div className="u-margin-left--md u-margin-y--md">
          <SportsSubNavItem
            navItem={allNavItem}
            onSelected={() => this.props.onSelected(allNavItem)}
            isSelected={this.props.isSelected(allNavItem, false)}
            isLiveActive={isLiveActive}
          />
        </div>
      </div>
    );
  };

  renderEditButton = ({ style }: CellRendererParams) => (
    <div style={style}>
      <div className="u-margin--md u-margin-left--sm">
        {this.props.canEdit && (
          <EditPillsButton
            onClick={this.props.onEdit}
            className="t-background-grey-light-3 t-color-grey u-drop-shadow"
          />
        )}
      </div>
    </div>
  );

  renderItem = (isLiveActive: boolean) => ({
    columnIndex,
    style,
  }: CellRendererParams) => {
    if (columnIndex === 0) {
      return this.renderAllNavItem({ style });
    }

    const navItem = this.props.navItems[columnIndex - 1];

    if (!navItem) {
      return this.renderEditButton({ style });
    }

    return (
      <div style={style}>
        <SportsSubNavItem
          key={navItem.path}
          navItem={navItem}
          onSelected={() => this.props.onSelected(navItem)}
          isSelected={this.props.isSelected(navItem, false)}
          isLiveActive={isLiveActive}
        />
      </div>
    );
  };

  render() {
    const tabCount = this.props.navItems.length;
    const buttonCount = 2; // include "all" pill to prepend, edit button to append
    const columnCount = tabCount + buttonCount;
    const [isLiveActive] = this.props.liveState;

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
          cellRenderer={this.renderItem(isLiveActive)}
          height={64}
          buttonRenderer={sportsPagerButtonRenderer}
          cacheBuster={this.props.cacheBuster}
        />
      </div>
    );
  }
}
