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
  editLabel: string,
  cacheBuster: string,
};

type State = [boolean, (boolean) => *];

export const renderLiveButton = ([isLiveActive, setIsLiveActive]: State) => (
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

export const renderTabList = (props: Props, state: State) => ({
  columnIndex,
  style,
}: CellRendererParams) => {
  const { navItems } = props;
  const offsetIndex = columnIndex - LIVE_BUTTON_OFFSET;

  const renderedTab = cond([
    [equals(-1), () => renderLiveButton(state)],
    [equals(navItems.length - 1), () => renderEditButton(props)],
    [T, () => renderTab(navItems[offsetIndex], props)],
  ])(offsetIndex);

  const className = classNames(
    columnIndex === 0 && "u-margin-left--md",
    columnIndex === navItems.length && "u-margin-right--xlg"
  );

  return (
    <div style={style}>
      <div className={className}>{renderedTab}</div>
    </div>
  );
};

export const SportsMainNav = (props: Props) => {
  const [isLiveActive, setIsLiveActive] = React.useState(false);

  const tabCount = props.navItems.length;
  const buttonCount = 1; // include Edit button
  const columnCount = tabCount + buttonCount;

  return (
    <ScrollablePaginated
      className="c-sports-nav-paginated"
      columnCount={columnCount}
      cellRenderer={renderTabList(props, [isLiveActive, setIsLiveActive])}
      height={106}
      buttonRenderer={sportsPagerButtonRenderer}
      cacheBuster={props.cacheBuster}
    />
  );
};
