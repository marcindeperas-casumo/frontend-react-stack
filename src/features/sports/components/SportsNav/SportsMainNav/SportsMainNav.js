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

// to calculate indices for cellRenderer, as we're rendering extra buttons as well as sport tabs for navItems
const LIVE_BUTTON_OFFSET = 1;

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

type State = [boolean, (boolean) => *];

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
  props: Props,
  state: State
) => ({ columnIndex, style }: CellRendererParams) => {
  const offsetIndex = columnIndex - LIVE_BUTTON_OFFSET;

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
  const [isLiveActive, setIsLiveActive] = props.liveState;

  // TODO: get real data and use real predicate or separate lists
  const filterNavItems = ni =>
    // $FlowIgnore
    isLiveActive ? !ni.text.includes("ball") : true; // filter live vs non-live when we have data
  const navItems = props.navItems.filter(filterNavItems);

  const tabCount = navItems.length;
  const buttonCount = 1; // include Edit button
  const columnCount = tabCount + buttonCount;

  const cacheBuster = `${props.cacheBuster}-${isLiveActive ? "live" : ""}`;

  return (
    <ScrollablePaginated
      className={classNames(
        isLiveActive &&
          "c-sports-nav-paginated--live t-background-orange-light-3", // TODO: check with Jack how to make this order-agnostic
        "c-sports-nav-paginated"
      )}
      columnCount={columnCount}
      cellRenderer={renderTabList(navItems, props, [
        isLiveActive,
        setIsLiveActive,
      ])}
      height={106}
      buttonRenderer={sportsPagerButtonRenderer}
      cacheBuster={cacheBuster}
    />
  );
};
