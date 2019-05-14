// @flow
import * as React from "react";
import classNames from "classnames";
import type { CellRendererParams } from "Src/types/ReactVirtualized/Grid";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import type { SportsNavItemType } from "./types";
import SportsNavTab from "./SportsNavTab";
import SportsSingleNavTab from "./SportsSingleNavTab";
import { sportsPagerButtonRenderer } from "./SportsNavPagerButton";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  editLabel: string,
  cacheBuster: string,
};

class SportsMainNav extends React.Component<Props> {
  renderEditButton = () => {
    const hasMultipleTabs = this.props.navItems.length > 1;

    const label = hasMultipleTabs && this.props.editLabel;

    const className = hasMultipleTabs
      ? "u-margin-vert--lg u-margin-left--md"
      : "u-margin--xlg u-padding-top";

    return (
      <div className={className}>
        {this.props.canEdit && (
          <EditPillsButton
            onClick={this.props.onEdit}
            className="t-background-white t-color-grey u-drop-shadow"
            label={label}
          />
        )}
      </div>
    );
  };

  renderSingleNav = ({ columnIndex, style }: CellRendererParams) => {
    const navItem = this.props.navItems[columnIndex];

    return (
      <div style={style}>
        {navItem ? (
          <SportsSingleNavTab
            onClick={() => this.props.onSelected(navItem)}
            navItem={navItem}
          />
        ) : (
          this.renderEditButton()
        )}
      </div>
    );
  };

  renderTabList = ({ columnIndex, style }: CellRendererParams) => {
    const navItem = this.props.navItems[columnIndex];

    const className = classNames(
      columnIndex === 0 && "u-margin-left--md",
      columnIndex === this.props.navItems.length && "u-margin-right--xlg"
    );

    return (
      <div style={style}>
        <div className={className}>
          {navItem ? (
            <SportsNavTab
              key={navItem.path}
              navItem={navItem}
              isSelected={this.props.isSelected(navItem)}
              onClick={() => this.props.onSelected(navItem)}
            />
          ) : (
            this.renderEditButton()
          )}
        </div>
      </div>
    );
  };

  render() {
    const tabCount = this.props.navItems.length;
    const buttonCount = 1; // include edit button to append
    const columnCount = tabCount + buttonCount;

    return (
      <div className="t-background-grey-light-2">
        <ScrollablePaginated
          className="c-sports-nav-paginated"
          columnCount={columnCount}
          cellRenderer={
            tabCount > 1 ? this.renderTabList : this.renderSingleNav
          }
          height={106}
          buttonRenderer={sportsPagerButtonRenderer}
          cacheBuster={this.props.cacheBuster}
        />
      </div>
    );
  }
}

export default SportsMainNav;
