// @flow
import * as React from "react";
import { useQuery, getApolloContext } from "@apollo/react-hooks";
import { USER_NAVIGATION_QUERY } from "Features/sports/components/SportsNav/SportsNavQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import {
  SportsMainNav,
  SportsSubNav,
  type SportsNavItemType,
} from "Features/sports/components/SportsNav";
import { SportsNavSkeleton } from "Features/sports/components/SportsNav/SportsNavSkeleton";
import * as navItemUtils from "Features/sports/components/SportsNav/sportsNavUtils";
import { MODAL } from "Features/sports/components/Modals";
import { useIsAuthenticated } from "Utils/hooks/useIsAuthenticated";

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
  client,
  isAuthenticated: boolean
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

  const isNotAllSports = currentHash !== `#${navItemUtils.ALL_SPORTS_PATH}`;

  return (
    <>
      <OpenModalMutation variables={{ modal: MODAL.CHOOSE_FAVOURITES }}>
        {openChooseFavouritesModal => (
          <SportsMainNav
            {...commonProps}
            navItems={navItems}
            canEdit={isAuthenticated}
            onEdit={openChooseFavouritesModal}
            cacheBuster={mainNavCacheBuster}
          />
        )}
      </OpenModalMutation>

      <OpenModalMutation
        variables={{ modal: MODAL.CHOOSE_FAVOURITE_COMPETITIONS }}
      >
        {openChooseFavouriteLeaguesModal =>
          isNotAllSports && (
            <SportsSubNav
              {...commonProps}
              navItems={selectedNavItem.subNav || []}
              canEdit={selectedNavItem.canEdit && isAuthenticated}
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
  const isAuthenticated = useIsAuthenticated();
  const { client } = React.useContext(getApolloContext());
  const [isLiveActive, setIsLiveActive] = React.useState(
    navItemUtils.isInPlayHash(currentHash)
  );
  const variables = { live: isLiveActive };
  const { loading, error, data } = useQuery(USER_NAVIGATION_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  // ensure live mode is kept in sync with changes to the hash made from elsewhere
  React.useEffect(() => {
    setIsLiveActive(navItemUtils.isInPlayHash(currentHash));
  }, [currentHash]);

  // Decision was made that our nav doesn't add any benefit on the following kambi routes
  // and take too much focus away from what is happening
  if (/#event|#bethistory/.test(currentHash)) {
    return null;
  }

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

  const setIsLiveActiveAndUpdateSelectedNavItem = (liveActive: boolean) => {
    setIsLiveActive(liveActive);

    const path = liveActive
      ? navItemUtils.ALL_SPORTS_PATH
      : data.sportsNavigation[0].sport.clientPath;

    navItemUtils.selectPath(client, path);
  };

  return renderSportsNav(
    currentHash,
    [isLiveActive, setIsLiveActiveAndUpdateSelectedNavItem],
    data,
    client,
    isAuthenticated
  );
};
