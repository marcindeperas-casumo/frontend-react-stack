// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import type { CellRendererParams } from "Src/types/ReactVirtualized/Grid";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  sportsPagerButtonRenderer,
  type SportsNavItemType,
} from "Features/sports/components/SportsNav";
import {
  SportTab,
  LiveTab,
} from "Features/sports/components/SportsNav/SportsNavTab";

export type Props = {
  navItems: Array<SportsNavItemType>,
  isSelected: SportsNavItemType => boolean,
  onSelected: SportsNavItemType => void,
  canEdit: boolean,
  onEdit: () => void,
  editLabel: string,
  cacheBuster: string,
};

export const renderLiveButton = (
  isLiveActive: boolean,
  setIsLiveActive: boolean => void
) => (
  <LiveTab
    onClick={() => setIsLiveActive(!isLiveActive)}
    label="Live"
    isActive={isLiveActive}
  />
);

export const renderEditButton = ({
  navItems,
  editLabel,
  canEdit,
  onEdit,
}: Props) => {
  const hasMultipleTabs = navItems.length > 1;
  const label = hasMultipleTabs && editLabel;
  const className = hasMultipleTabs
    ? "u-margin-y--lg u-margin-left--md"
    : "u-margin--xlg u-padding-top";

  return (
    <div className={className}>
      {canEdit && (
        <EditPillsButton
          onClick={onEdit}
          className="t-background-white t-color-grey u-drop-shadow"
          label={label}
        />
      )}
    </div>
  );
};

export const renderTabList = (props: Props) => ({
  columnIndex,
  style,
}: CellRendererParams) => {
  const navItem = props.navItems[columnIndex];

  const className = classNames(
    columnIndex === 0 && "u-margin-left--md",
    columnIndex === props.navItems.length && "u-margin-right--xlg"
  );

  return (
    <div style={style}>
      <div className={className}>
        {navItem ? (
          <SportTab
            key={navItem.path}
            navItem={navItem}
            isSelected={props.isSelected(navItem)}
            onClick={() => props.onSelected(navItem)}
          />
        ) : (
          renderEditButton(props)
        )}
      </div>
    </div>
  );
};

export const SportsMainNav = (props: Props) => {
  const [isLiveActive, setIsLiveActive] = React.useState(false);

  const tabCount = props.navItems.length;
  const buttonCount = 1; // include Edit button
  const columnCount = tabCount + buttonCount;

  return (
    <Flex className="t-background-grey-light-2">
      <Flex.Item>{renderLiveButton(isLiveActive, setIsLiveActive)}</Flex.Item>
      <Flex.Block>
        <ScrollablePaginated
          className="c-sports-nav-paginated"
          columnCount={columnCount}
          cellRenderer={renderTabList(props)}
          height={106}
          buttonRenderer={sportsPagerButtonRenderer}
          cacheBuster={props.cacheBuster}
        />
      </Flex.Block>
    </Flex>
  );
};
