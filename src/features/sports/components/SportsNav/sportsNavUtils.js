// @flow
import React from "react";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import { NAVIGATE_CLIENT_MUTATION } from "Features/sports/state";
import { type SportsNavItemType } from "Features/sports/components/SportsNav";

const isNavItemSelected = (currentHash: string = "") => (
  navItem: SportsNavItemType
) => {
  const isCurrentHash = currentHash === `#${navItem.path}`;
  const isParentPath = currentHash.includes(`${navItem.path}/`);
  const isDrillDown = currentHash.includes(
    navItem.path.replace(/racing|filter/, "drill-down")
  );

  return isCurrentHash || isParentPath || isDrillDown;
};

const onNavItemSelected = (currentHash: string, client: *) => (
  navItem: SportsNavItemType,
  ignoreSubpathMatching?: boolean
) => {
  const isPathUnchanged = `#${navItem.path}` === currentHash;
  const hasParentPath =
    !ignoreSubpathMatching && currentHash.includes(`${navItem.path}/`);
  const path =
    isPathUnchanged && hasParentPath ? navItem.parentPath : navItem.path;

  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path,
      trackingLocation: "SportsNav",
    },
  });
};

const toSubNavItem = (sport: UserNavigation_sportsNavigation_sport) => (
  subNav: UserNavigation_sportsNavigation_subNav
) => ({
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
  path: subNav.competition.clientPath,
  parentPath: sport.clientPath,
  key: sport.termKey,
  canEdit: false,
});

const toNavItem = ({
  sport,
  subNav,
}: UserNavigation_sportsNavigation): SportsNavItemType => ({
  text: sport.name,
  path: sport.clientPath,
  key: sport.termKey,
  iconProps: {
    iconSrc: sport.icon,
    activeIndicator: sport.activeIndicator,
    alt: sport.name,
  },
  canEdit: sport.canSelectSubgroups,
  subNav: subNav.map(toSubNavItem(sport)),
});

export const navItemUtils = {
  isNavItemSelected,
  onNavItemSelected,
  toSubNavItem,
  toNavItem,
};
