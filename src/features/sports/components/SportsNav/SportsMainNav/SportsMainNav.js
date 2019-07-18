// @flow
import * as React from "react";
import classNames from "classnames";
import { cond, equals, T } from "ramda";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS } from "Src/constants";
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

const SPORTS_NAV_HEIGHT = 106;

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
    onClick={() => {
      const newState = !isLiveActive;

      tracker.track(EVENTS.MIXPANEL_SPORTS_LIVE_NAV_TOGGLE, {
        [EVENT_PROPS.SPORTS_STATE]: newState,
      });
      setIsLiveActive(newState);
    }}
    label={label}
    isActive={isLiveActive}
  />
);

export const renderEditButton = (
  { navItems, labels, canEdit, onEdit }: Props,
  [isLiveActive]: LiveState
) => (
  <div className="u-margin-y--lg u-margin-left--md">
    {canEdit && !isLiveActive && (
      <EditPillsButton
        onClick={onEdit}
        className="t-background-white t-color-grey u-drop-shadow"
        label={labels.edit}
      />
    )}
  </div>
);

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
  const buttonsBeforeNav = ["live"];
  const offsetIndex = columnIndex - buttonsBeforeNav.length;

  const isFirstItem = equals(-1);
  const isLastItem = equals(navItems.length);

  const renderedTab = cond([
    [isFirstItem, () => renderLiveButton(props.labels.live, props.liveState)],
    [isLastItem, () => renderEditButton(props, props.liveState)],
    [T, () => renderTab(navItems[offsetIndex], props)],
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
  const buttonsBeforeNav = ["live"];
  const buttonsAfterNav = ["edit"];
  const columnCount =
    buttonsBeforeNav.length + tabCount + buttonsAfterNav.length;

  const cacheBuster = `${props.cacheBuster}-${isLiveActive ? "live" : ""}`;

  return (
    <ScrollablePaginated
      className={classNames(
        isLiveActive
          ? "c-sports-nav-paginated--live t-background-orange-light-3"
          : "t-background-grey-light-2",
        "c-sports-nav-paginated"
      )}
      columnCount={columnCount}
      cellRenderer={renderTabList(navItems, props)}
      height={SPORTS_NAV_HEIGHT}
      buttonRenderer={sportsPagerButtonRenderer}
      cacheBuster={cacheBuster}
    />
  );
};
