// @flow
import React from "react";
import * as R from "ramda";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { NAVIGATE_CLIENT_MUTATION } from "Features/sports/state";
import { type SportsNavItemType } from "Features/sports/components/SportsNav";

const selectPath = (client: *, path: string) => {
  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

type IsSelectedPredicateArgs = {
  currentHash: string,
  navItem: SportsNavItemType,
};

const isDrilldown = ({ currentHash, navItem }: IsSelectedPredicateArgs) =>
  currentHash.includes(navItem.path.replace(/racing|filter/, "drill-down"));

const isMainNavItemSelected = ({
  currentHash,
  navItem,
}: IsSelectedPredicateArgs) => {
  const sportOnlyPath = R.pipe(
    R.split("/"),
    R.take(2),
    R.join("/")
  )(navItem.path);

  return !navItem.parentPath && currentHash.startsWith(`#${sportOnlyPath}`);
};

const isSubnavItemSelected = ({
  currentHash,
  navItem,
}: IsSelectedPredicateArgs) =>
  navItem.parentPath && currentHash === `#${navItem.path}`;

const isNavItemSelected = (currentHash: string = "") => (
  navItem: SportsNavItemType
) =>
  R.anyPass([isDrilldown, isMainNavItemSelected, isSubnavItemSelected])({
    currentHash,
    navItem,
  });

const onNavItemSelected = (
  currentHash: string,
  client: *,
  isLiveActive: boolean = false
) => (navItem: SportsNavItemType) => {
  const isPathUnchanged = `#${navItem.path}` === currentHash;
  const hasParentPath = currentHash.includes(`${navItem.path}/`);
  const path =
    isPathUnchanged && hasParentPath ? navItem.parentPath : navItem.path;

  tracker.track(EVENTS.MIXPANEL_SPORTS_NAV_SELECTED, {
    [EVENT_PROPS.SPORTS_SELECTED_NAV]: path,
    [EVENT_PROPS.SPORTS_IS_LIVE_ACTIVE]: isLiveActive,
  });

  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

const toSubNavItem = (
  isLiveActive: boolean,
  sport: UserNavigation_sportsNavigation_sport
) => (subNav: UserNavigation_sportsNavigation_subNav) => ({
  text: (
    <>
      {subNav.competition.regionCode && (
        <RegionFlag
          regionCode={subNav.competition.regionCode}
          className="u-margin-right"
        />
      )}
      {subNav.competition.name}
    </>
  ),
  path: isLiveActive
    ? subNav.competition.clientPathLive
    : subNav.competition.clientPath,
  parentPath: isLiveActive ? sport.clientPathLive : sport.clientPath,
  key: sport.termKey,
  canEdit: false,
});

const toNavItem = (isLiveActive: boolean) => ({
  sport,
  subNav,
}: UserNavigation_sportsNavigation): SportsNavItemType => ({
  text: sport.name,
  path: isLiveActive ? sport.clientPathLive : sport.clientPath,
  key: sport.termKey,
  iconProps: {
    iconSrc: sport.icon,
    activeIndicator: sport.activeIndicator,
    alt: sport.name,
  },
  canEdit: sport.canSelectSubgroups,
  subNav: subNav.map(toSubNavItem(isLiveActive, sport)),
});

export const navItemUtils = {
  selectPath,
  isNavItemSelected,
  onNavItemSelected,
  toSubNavItem,
  toNavItem,
};

export const makeAllSportsNavItem = (label: string) => ({
  text: label,
  path: "filter/all/all/all/all/in-play",
  key: "all",
  canEdit: false,
  iconProps: {
    // TODO: get from CMS
    activeIndicator: `<?xml version="1.0" encoding="UTF-8"?> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none"> <g style="mix-blend-mode:multiply"> <rect x="20" y="19" width="22" height="22" rx="11" fill="currentColor"></rect> </g> </svg>`,
    iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/all_sports.svg",
    alt: label,
  },
});
