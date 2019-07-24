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

const doSportsMatch = (path1: string, path2: string) => {
  const trimSport = R.pipe(
    R.split("/"),
    R.take(2),
    R.join("")
  );
  return R.eqBy(trimSport, path1, path2);
};

const isDrilldown = ({ currentHash, navItem }: IsSelectedPredicateArgs) =>
  currentHash.includes(navItem.path.replace(/racing|filter/, "drill-down"));

const isMainNavItemSelected = ({
  currentHash,
  navItem,
}: IsSelectedPredicateArgs) => {
  const path = navItem.path.replace(/\/all\/.+in-play/gi, "");
  return !navItem.parentPath && currentHash.startsWith(`#${path}`);
};

const isSubnavItemSelected = ({
  currentHash,
  navItem,
}: IsSelectedPredicateArgs) => {
  return navItem.parentPath && currentHash === `#${navItem.path}`;
};

const isNavItemSelected = (currentHash: string = "") => (
  navItem: SportsNavItemType
) => {
  return R.anyPass([isDrilldown, isMainNavItemSelected, isSubnavItemSelected])({
    currentHash,
    navItem,
  });
};

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
  doSportsMatch,
  selectPath,
  isNavItemSelected,
  onNavItemSelected,
  toSubNavItem,
  toNavItem,
};
