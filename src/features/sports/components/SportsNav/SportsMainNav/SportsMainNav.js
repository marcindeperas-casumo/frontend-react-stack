// @flow
import * as React from "react";
import classNames from "classnames";
import { cond, equals, T } from "ramda";
import { LiveBetIcon, CloseIcon, AllSportsIcon } from "@casumo/cmp-icons";
import { Pill } from "Components/Pill";
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
import { makeAllSportsNavItem } from "Features/sports/components/SportsNav/sportsNavUtils";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

import "./SportsMainNav.scss";

const SPORTS_NAV_HEIGHT = 42;
const buttonsBeforeNav = ["live", "all"];

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

const VerticalSeparator = ({ className }: { className?: string }) => {
  return (
    <div
      className={`u-height--full t-border-left--lg t-border-grey-5 t-border-r--sm ${className}`}
    />
  );
};

export const renderLiveButton = (
  { navItems, labels, canEdit, onEdit }: Props,
  [isLiveActive, setIsLiveActive]: LiveState
) => {
  const onClick = () => {
    const newState = !isLiveActive;

    tracker.track(EVENTS.MIXPANEL_SPORTS_LIVE_NAV_TOGGLE, {
      [EVENT_PROPS.SPORTS_STATE]: newState,
    });
    setIsLiveActive(newState);
  };

  return (
    <div className="u-height--full u-display--flex">
      <Pill
        inactiveClassNames="t-color-red-30 t-background-white t-elevation--10"
        activeClassNames="t-background-red-30 t-color-white"
        isActive={isLiveActive}
        onClick={onClick}
      >
        <LiveBetIcon className="u-margin-right--sm" />
        {labels.live}
        {isLiveActive && <CloseIcon className="u-margin-left--sm" />}
      </Pill>
      <VerticalSeparator className="u-margin-left" />
    </div>
  );
};

export const renderEditButton = (
  { navItems, labels, canEdit, onEdit }: Props,
  [isLiveActive]: LiveState
) => {
  if (canEdit && !isLiveActive) {
    return (
      <div className="u-height--full u-display--flex">
        <VerticalSeparator className="u-margin-right" />
        <div className="u-padding-top--sm">
          <EditPillsButton onClick={onEdit} label={labels.edit} />
        </div>
      </div>
    );
  }
};

const renderTab = (
  navItem: SportsNavItemType,
  { isSelected, onSelected }: Props
) => (
  <div onClick={() => onSelected(navItem)}>
    <Pill
      inactiveClassNames="t-background-white t-color-grey-70 t-elevation--10"
      activeClassNames="t-background-purple-50 t-color-white c-sports-nav-sport-tab--selected"
      isActive={isSelected(navItem)}
    >
      <img
        width="24"
        height="24"
        className="u-margin-right--sm"
        alt=""
        src={navItem.iconProps && navItem.iconProps.iconSrc}
      />
      {navItem.text}
    </Pill>
  </div>
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
          <Pill
            activeClassNames="t-background-purple-50 t-color-white"
            inactiveClassNames="t-background-white t-color-grey-70 t-elevation--10"
            onClick={() => onSelected(navItem)}
            isActive={isSelected(navItem)}
          >
            <AllSportsIcon className="u-margin-right--sm" />
            {navItem.text}
          </Pill>
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

  const isFirstItem = equals(-offset);
  const isSecondItem = equals(-offset + 1);
  const isLastItem = equals(navItems.length);

  const renderedTab = cond([
    [isFirstItem, () => renderLiveButton(props, props.liveState)],
    [isSecondItem, () => renderAllSportsTab(props, props.liveState)],
    [isLastItem, () => renderEditButton(props, props.liveState)],
    [T, () => renderTab(navItems[offsetIndex], props)],
  ])(offsetIndex);

  const itemWithNoMargin = isSecondItem(offsetIndex) && !props.liveState[0];

  return (
    <div style={style}>
      <div
        className={classNames(
          !itemWithNoMargin && "u-margin-right",
          "u-height--full"
        )}
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
    <div className="u-padding-x--md u-padding-x--lg@desktop u-padding-top--md u-padding-top--lg@desktop u-padding-bottom">
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
    </div>
  );
};
