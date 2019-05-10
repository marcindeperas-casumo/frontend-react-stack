// @flow
import React from "react";
import type { CellRendererParams } from "react-virtualized";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { Pill } from "Components/Pill";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import type { SportsNavItemType } from "./types";
import { sportsPagerButtonRenderer } from "./SportsScrollablePaginatedButton";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: (SportsNavItemType, boolean) => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  allLabel: string,
  rerenderMotherfucker: string,
};

type SportsSubNavItemProps = {
  navItem: SportsNavItemType,
  isSelected: boolean,
  onSelected: () => void,
};

const SportsSubNavItem = (props: SportsSubNavItemProps) => (
  <div
    key={props.navItem.path}
    onClick={props.onSelected}
    className="u-margin-vert--md u-margin-horiz--sm"
  >
    <Pill
      inactiveClassNames="u-drop-shadow t-background-grey-light-3 t-color-grey-dark-1"
      activeClassNames="u-drop-shadow t-background-green t-color-white"
      isActive={props.isSelected}
    >
      {props.navItem.text}
    </Pill>
  </div>
);

class SportsSubNav extends React.Component<Props> {
  renderAllNavItem = ({ style }: CellRendererParams) => {
    const allNavItem = {
      text: this.props.allLabel,
      path: this.props.navItems[0].parentPath || "",
      key: "all",
      canEdit: false,
    };

    return (
      <div style={style}>
        <div className="u-margin-left--md u-margin-vert--md">
          <SportsSubNavItem
            navItem={allNavItem}
            onSelected={() => this.props.onSelected(allNavItem)}
            isSelected={this.props.isSelected(allNavItem, false)}
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

  renderItem = ({ columnIndex, style }: CellRendererParams) => {
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
        />
      </div>
    );
  };

  render() {
    const tabCount = this.props.navItems.length;
    const buttonCount = 2; // include "all" pill to prepend, edit button to append
    const columnCount = tabCount + buttonCount;

    return (
      <div className="t-background-grey-light-2 u-margin-top--sm">
        <ScrollablePaginated
          className="c-sports-nav-paginated"
          columnCount={columnCount}
          cellRenderer={this.renderItem}
          height={64}
          buttonRenderer={sportsPagerButtonRenderer}
          rerenderMotherfucker={this.props.rerenderMotherfucker}
        />
      </div>
    );
  }
}

export default SportsSubNav;
