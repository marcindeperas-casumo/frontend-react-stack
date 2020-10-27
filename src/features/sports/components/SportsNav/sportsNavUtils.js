// @flow
import React from "react";
import * as A from "Types/apollo";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { type SportsNavItemType } from "Features/sports/components/SportsNav";

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
