// @flow
import * as React from "react";
import {
  USER_NAVIGATION_QUERY,
  UserNavigationTypedQuery,
} from "Features/sports/components/SportsNav/SportsNavQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { OpenModalMutation, ClientContext } from "Features/sports/state";
import {
  SportsMainNav,
  SportsSubNav,
  type SportsNavItemType,
} from "Features/sports/components/SportsNav";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";
import {
  ALL_SPORTS_PATH,
  navItemUtils,
} from "Features/sports/components/SportsNav/sportsNavUtils";

export type LiveState = [boolean, (boolean) => void];

export type Labels = {
  all: string,
  edit: string,
  live: string,
};

const renderSportsNav = (
  currentHash: string,
  liveState: LiveState,
  data,
  client
) => {
  const [isLiveActive] = liveState;
  const isNavItemSelected = navItemUtils.isNavItemSelected(currentHash);
  const onNavItemSelected = navItemUtils.onNavItemSelected(
    currentHash,
    client,
    isLiveActive
  );

  const navItems: Array<SportsNavItemType> = data.sportsNavigation.map(
    navItemUtils.toNavItem(isLiveActive)
  );

  if (navItems.length === 0) {
    return <SportsNavSkeleton />;
  }

  const selectedNavItem =
    navItems.find(navItem => isNavItemSelected(navItem)) || navItems[0];

  const { subNav = [] } = selectedNavItem;

  const selectedSubNavItem = subNav.find(subNavItem =>
    isNavItemSelected(subNavItem)
  );

  const mainNavCacheBuster = [
    selectedNavItem.path,
    ...navItems.map(navItem => navItem.path),
    currentHash,
  ].join();

  const subNavCacheBuster = subNav
    .map(navItem => {
      const isActive =
        selectedSubNavItem && selectedSubNavItem.path === navItem.path;

      return `${currentHash}/${navItem.path}/${isActive ? `:active` : ""}`;
    })
    .join();

  const labels = {
    edit: data.editLabel,
    live: data.liveLabel,
    all: data.allLabel,
  };

  const commonProps = {
    labels,
    liveState,
    isSelected: isNavItemSelected,
    onSelected: onNavItemSelected,
  };

  const hideSubNav = currentHash === `#${ALL_SPORTS_PATH}`;

  return (
    <>
      <OpenModalMutation variables={{ modal: "CHOOSE_FAVOURITES" }}>
        {openChooseFavouritesModal => (
          <SportsMainNav
            {...commonProps}
            navItems={navItems}
            canEdit={true}
            onEdit={openChooseFavouritesModal}
            cacheBuster={mainNavCacheBuster}
          />
        )}
      </OpenModalMutation>

      <OpenModalMutation variables={{ modal: "CHOOSE_FAVOURITE_COMPETITIONS" }}>
        {openChooseFavouriteLeaguesModal =>
          !hideSubNav && (
            <SportsSubNav
              {...commonProps}
              navItems={selectedNavItem.subNav || []}
              canEdit={selectedNavItem.canEdit}
              onEdit={openChooseFavouriteLeaguesModal}
              cacheBuster={subNavCacheBuster}
            />
          )
        }
      </OpenModalMutation>
    </>
  );
};

export const SportsNav = ({ currentHash }: { currentHash: string }) => {
  const { client } = React.useContext(ClientContext);
  const [isLiveActive, setIsLiveActive] = React.useState(false);

  // Decision was made that our nav doesn't add any benefit on the following kambi routes
  // and take too much focus away from what is happening
  if (/#event|#bethistory/.test(currentHash)) {
    return null;
  }

  return (
    <UserNavigationTypedQuery
      query={USER_NAVIGATION_QUERY}
      variables={{ live: isLiveActive }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <SportsNavSkeleton />;
        }

        if (error) {
          return <ErrorMessage direction="horizontal" />;
        }

        if (
          !data ||
          !data.sportsNavigation ||
          !data.allLabel ||
          !data.editLabel ||
          !data.liveLabel
        ) {
          return null;
        }

        const setIsLiveActiveAndUpdateSelectedNavItem = (
          liveActive: boolean
        ) => {
          setIsLiveActive(liveActive);

          navItemUtils.selectPath(
            client,
            data.sportsNavigation[0].sport.clientPath
          );
        };

        return renderSportsNav(
          currentHash,
          [isLiveActive, setIsLiveActiveAndUpdateSelectedNavItem],
          data,
          client
        );
      }}
    </UserNavigationTypedQuery>
  );
};
