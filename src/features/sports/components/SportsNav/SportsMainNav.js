// @flow

import * as React from "react";
import Scrollable from "@casumo/cmp-scrollable";
import Flex from "@casumo/cmp-flex";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import type { SportsNavItemType } from "./types";
import SportsNavTab from "./SportsNavTab";
import SportsSingleNavTab from "./SportsSingleNavTab";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
};

class SportsMainNav extends React.Component<Props> {
  renderTabList = (navItems: Array<SportsNavItemType>) => {
    return navItems.map<React.Node>(navItem => (
      <SportsNavTab
        key={navItem.path}
        navItem={navItem}
        isSelected={this.props.isSelected(navItem)}
        onClick={() => this.props.onSelected(navItem)}
      />
    ));
  };

  renderSingleNav = (navItem: SportsNavItemType) => {
    return (
      <SportsSingleNavTab
        onClick={() => this.props.onSelected(navItem)}
        navItem={navItem}
      />
    );
  };

  render() {
    const { navItems, canEdit, onEdit } = this.props;

    return (
      <div>
        <Scrollable
          padding="lg"
          itemSpacing="lg"
          className="t-background-grey-light-2 "
        >
          {navItems.length > 1 && this.renderTabList(navItems)}

          {navItems.length === 1 && this.renderSingleNav(navItems[0])}

          {canEdit && (
            <Flex.Block className="o-flex-align--center">
              <Flex justify="end" align="center" className="o-flex--1">
                <EditPillsButton
                  onClick={onEdit}
                  className="t-background-white t-color-grey u-drop-shadow"
                />
              </Flex>
            </Flex.Block>
          )}
        </Scrollable>
      </div>
    );
  }
}

export default SportsMainNav;
