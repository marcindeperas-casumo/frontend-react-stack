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
import {
  makeAllSportsNavItem,
  makeHomeNavItem,
} from "Features/sports/components/SportsNav/sportsNavUtils";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

import "./SportsMainNav.scss";

const SPORTS_NAV_HEIGHT = 106;
const buttonsBeforeNav = ["live", "all", "home"];

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
  { navItems, labels, canEdit, onEdit }: Props,
  [isLiveActive, setIsLiveActive]: LiveState,
  sportCount: number
) => (
  <LiveTab
    count={sportCount}
    label={labels.live}
    isActive={isLiveActive}
    onClick={() => {
      const newState = !isLiveActive;

      tracker.track(EVENTS.MIXPANEL_SPORTS_LIVE_NAV_TOGGLE, {
        [EVENT_PROPS.SPORTS_STATE]: newState,
      });
      setIsLiveActive(newState);
    }}
  />
);

export const renderEditButton = (
  { navItems, labels, canEdit, onEdit }: Props,
  [isLiveActive]: LiveState
) => (
  <div className="u-padding-y u-margin-x c-sports-nav-edit-btn">
    {canEdit && !isLiveActive && (
      <div className="u-padding-left--md u-padding-y--md c-sports-nav-edit-btn__wrapper">
        <EditPillsButton onClick={onEdit} label={labels.edit} />
      </div>
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

export const renderAllSportsTab = (
  { isSelected, onSelected }: Props,
  [isLiveActive]: LiveState
) =>
  isLiveActive && (
    <DictionaryTerm termKey="navigation.all">
      {allSportsGroupTitle => {
        const navItem = makeAllSportsNavItem(allSportsGroupTitle);
        return (
          <SportTab
            isSelected={isSelected(navItem)}
            onClick={() => onSelected(navItem)}
            navItem={navItem}
          />
        );
      }}
    </DictionaryTerm>
  );

export const renderHomeTab = (
  { isSelected, onSelected }: Props,
  [isLiveActive]: LiveState
) =>
  !isLiveActive && (
    <DictionaryTerm termKey="navigation.home">
      {homeTitle => {
        const navItem = makeHomeNavItem(homeTitle);
        return (
          <SportTab
            isSelected={isSelected(navItem)}
            onClick={() => onSelected(navItem)}
            navItem={navItem}
          />
        );
      }}
    </DictionaryTerm>
  );

export const renderTabList = (
  navItems: Array<SportsNavItemType>,
  props: Props
) => ({ columnIndex, style }: CellRendererParams) => {
  const offset = buttonsBeforeNav.length;
  const offsetIndex = columnIndex - offset;
  const sportsCount = navItems.length - offset;

  const isFirstItem = equals(-offset);
  const isSecondItem = equals(-offset + 1);
  const isThirdItem = equals(-offset + 2);
  const isLastItem = equals(navItems.length);

  const renderedTab = cond([
    [isFirstItem, () => renderLiveButton(props, props.liveState, sportsCount)],
    [isSecondItem, () => renderHomeTab(props, props.liveState)],
    [isThirdItem, () => renderAllSportsTab(props, props.liveState)],
    [isLastItem, () => renderEditButton(props, props.liveState)],
    [T, () => renderTab(navItems[offsetIndex], props)],
  ])(offsetIndex);

  return (
    <div style={style}>
      <div
        className={classNames(isLastItem(offsetIndex) && "u-margin-right--md")}
      >
        {renderedTab}
      </div>
    </div>
  );
};

export const SportsMainNav = (props: Props) => {
  const [isLiveActive] = props.liveState;

  const tabCount = props.navItems.length;
  const buttonsAfterNav = ["edit"];
  const columnCount =
    buttonsBeforeNav.length + tabCount + buttonsAfterNav.length;

  const cacheBuster = `${props.cacheBuster}-${isLiveActive ? "live" : ""}`;

  return (
    <ScrollablePaginated
      className={classNames(
        isLiveActive && "c-sports-nav-paginated--live",
        "c-sports-nav-paginated"
      )}
      columnCount={columnCount}
      cellRenderer={renderTabList(props.navItems, props)}
      height={SPORTS_NAV_HEIGHT}
      buttonRenderer={sportsPagerButtonRenderer}
      cacheBuster={cacheBuster}
    />
  );
};
