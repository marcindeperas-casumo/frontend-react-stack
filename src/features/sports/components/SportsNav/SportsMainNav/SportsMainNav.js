// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import { SportsNavTab } from "Features/sports/components/SportsNav/SportsNavTab/SportsNavTab";
import type { CellRendererParams } from "Src/types/ReactVirtualized/Grid";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  sportsPagerButtonRenderer,
  type SportsNavItemType,
} from "Features/sports/components/SportsNav";
import { SportsLiveTab } from "Features/sports/components/SportsNav/SportsLiveTab/SportsLiveTab";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  editLabel: string,
  cacheBuster: string,
};

type State = {
  isLiveActive: boolean,
};

export class SportsMainNav extends React.Component<Props, State> {
  state = {
    isLiveActive: false,
  };

  toggleLiveState = () =>
    this.setState({ isLiveActive: !this.state.isLiveActive });

  renderLiveButton = () => (
    <SportsLiveTab
      onClick={this.toggleLiveState}
      label="Live"
      isActive={this.state.isLiveActive}
    />
  );

  renderEditButton = () => {
    const hasMultipleTabs = this.props.navItems.length > 1;
    const label = hasMultipleTabs && this.props.editLabel;
    const className = hasMultipleTabs
      ? "u-margin-y--lg u-margin-left--md"
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
    const buttonCount = 1; // include Edit button
    const columnCount = tabCount + buttonCount;

    return (
      <Flex className="t-background-grey-light-2">
        <Flex.Item>{this.renderLiveButton()}</Flex.Item>
        <Flex.Block>
          <ScrollablePaginated
            className="c-sports-nav-paginated"
            columnCount={columnCount}
            cellRenderer={this.renderTabList}
            height={106}
            buttonRenderer={sportsPagerButtonRenderer}
            cacheBuster={this.props.cacheBuster}
          />
        </Flex.Block>
      </Flex>
    );
  }
}
