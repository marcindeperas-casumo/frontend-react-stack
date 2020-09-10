// @flow
import React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { NAVIGATE_CLIENT_MUTATION } from "Models/apollo/mutations";
import { type SportsNavItemType } from "Features/sports/components/SportsNav";

export const selectPath = (client: *, path: string) => {
  client.mutate<A.NavigateClient>({
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

export const isNavItemSelected = (currentHash: string = "") => (
  navItem: SportsNavItemType
) =>
  R.anyPass([isDrilldown, isMainNavItemSelected, isSubnavItemSelected])({
    currentHash,
    navItem,
  });

export const onNavItemSelected = (
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

  client.mutate<A.NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

const toSubNavItem = (
  isLiveActive: boolean,
  sport: A.UserNavigation_sportsNavigation_sport
) => (subNav: A.UserNavigation_sportsNavigation_subNav) => ({
  text: (
    <>
      {subNav.competition.regionCode && (
        <div className="u-width--lg u-height--md">
          <RegionFlag
            regionCode={subNav.competition.regionCode}
            className="u-margin-right"
          />
        </div>
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

export const toNavItem = (isLiveActive: boolean) => ({
  sport,
  subNav,
}: A.UserNavigation_sportsNavigation): SportsNavItemType => ({
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

export const IN_PLAY_URL_PART = "in-play";
export const SPORTS_HOME_PAGE_PATH = "home";
export const SPORTS_COUPON_PAGE_PATH = "coupon";
export const ALL_SPORTS_PATH = `filter/all/all/all/all/${IN_PLAY_URL_PART}`;
export const isInPlayHash = (hash: string) => hash.includes(IN_PLAY_URL_PART);

export const activeIndicator = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none"><rect x="20" y="19" width="22" height="22" rx="11" fill="currentColor"/></svg>`;

export const makeAllSportsNavItem = (label: string) => ({
  text: label,
  path: ALL_SPORTS_PATH,
  key: "all",
  canEdit: false,
  iconProps: {
    activeIndicator,
    iconSrc: "https://cms.casumo.com/wp-content/uploads/2019/02/all_sports.svg",
    alt: label,
  },
});
