// @flow
import * as React from "react";
import classNames from "classnames";
import { cond, equals, T } from "ramda";
import type { CellRendererParams } from "Src/types/ReactVirtualized/Grid";
import ScrollablePaginated from "Components/ScrollablePaginated";
import EditPillsButton from "Features/sports/components/EditPillsButton";
import {
  sportsPagerButtonRenderer,
  type SportsNavItemType,
  type LiveState,
  type Labels,
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
  cacheBuster: string,
  liveState: LiveState,
  labels: Labels,
};

export const renderLiveButton = (
  label: string,
  [isLiveActive, setIsLiveActive]: LiveState
) => (
  <LiveTab
    onClick={() => setIsLiveActive(!isLiveActive)}
    label={label}
    isActive={isLiveActive}
  />
);

export const renderEditButton = ({
  navItems,
  labels,
  canEdit,
  onEdit,
}: Props) => {
  const hasMultipleTabs = navItems.length > 1;
  const label = hasMultipleTabs && labels.edit;
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

const renderTab = (
  navItem: SportsNavItemType,
  { isSelected, onSelected }: Props
) => (
  <SportTab
    key={navItem.path}
    navItem={navItem}
    isSelected={isSelected(navItem)}
    onClick={() => onSelected(navItem)}
  />
);

export const renderTabList = (
  navItems: Array<SportsNavItemType>,
  props: Props
) => ({ columnIndex, style }: CellRendererParams) => {
  // to calculate indices for cellRenderer, as we're rendering extra buttons as well as sport tabs for navItems
  const liveButtonCount = 1;
  const offsetIndex = columnIndex - liveButtonCount;

  const isFirstItem = equals(-1);
  const isLastItem = equals(navItems.length - 1);

  // prettier-ignore
  const renderedTab = cond([
    [isFirstItem, () => renderLiveButton(props.labels.live, props.liveState)],
    [isLastItem,  () => renderEditButton(props)],
    [T,           () => renderTab(navItems[offsetIndex], props)],
  ])(offsetIndex);

  return (
    <div style={style}>
      <div
        className={classNames(isLastItem(offsetIndex) && "u-margin-right--xlg")}
      >
        {renderedTab}
      </div>
    </div>
  );
};

export const SportsMainNav = (props: Props) => {
  const [isLiveActive] = props.liveState;

  const { navItems } = props;
  const tabCount = navItems.length;
  const buttonCount = 1; // include Edit button
  const columnCount = tabCount + buttonCount;

  const cacheBuster = `${props.cacheBuster}-${isLiveActive ? "live" : ""}`;

  return (
    <ScrollablePaginated
      className={classNames(
        isLiveActive
          ? "c-sports-nav-paginated--live t-background-orange-light-3"
          : "t-background-grey-light-2", // TODO: check with Jack how to make this order-agnostic
        "c-sports-nav-paginated"
      )}
      columnCount={columnCount}
      cellRenderer={renderTabList(navItems, props)}
      height={106}
      buttonRenderer={sportsPagerButtonRenderer}
      cacheBuster={cacheBuster}
    />
  );
};
