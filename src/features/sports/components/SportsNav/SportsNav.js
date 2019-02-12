// @flow
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { has } from "ramda";

import SportsMainNav from "./SportsMainNav";
import SportsSubNav from "./SportsSubNav";

import {
  NAVIGATE_CLIENT_MUTATION,
  ClientContext,
  OpenModalMutation,
} from "Features/sports/state";

import SportsNavSkeleton from "./SportsNavSkeleton";
import type { SportsNavItemType } from "./types";

type SportsNavProps = {
  currentHash: string,
};

export const USER_NAVIGATION_QUERY = gql`
  query UserNavigation {
    userNavigation {
      name
      id
      clientPath
      termKey
      flagEmoji
      icon

      groups {
        name
        id
        clientPath
        termKey
        flagEmoji
      }
    }
  }
`;

class UserNavigationTypedQuery extends Query<UserNavigation, null> {}

export const isNavItemSelected = (
  currentHash: string = "",
  navItem: SportsNavItemType
) => {
  const isCurrentHash = currentHash === `#${navItem.path}`;
  const isParentPath = currentHash.includes(`${navItem.path}/`);
  const isDrillDown = currentHash.includes(
    navItem.path.replace(/racing|filter/, "drill-down")
  );

  return isCurrentHash || isParentPath || isDrillDown;
};

export const onNavItemSelected = (
  currentHash: string,
  navItem: SportsNavItemType,
  client: *
) => {
  const isPathUnchanged = `#${navItem.path}` === currentHash;
  const hasParentPath = has("parentPath", navItem);

  client.mutate<NavigateClient>({
    mutation: NAVIGATE_CLIENT_MUTATION,
    variables: {
      path:
        isPathUnchanged && hasParentPath ? navItem.parentPath : navItem.path,
      trackingLocation: "SportsNav",
    },
  });
};

class SportsNav extends React.Component<SportsNavProps> {
  static contextType = ClientContext;

  isNavItemSelected = (navItem: SportsNavItemType) =>
    isNavItemSelected(this.props.currentHash, navItem);

  onNavItemSelected = (navItem: SportsNavItemType) =>
    onNavItemSelected(this.props.currentHash, navItem, this.context.client);

  mapGroupToNavItem = (
    group: UserNavigation_userNavigation
  ): SportsNavItemType => ({
    text: group.name,
    path: group.clientPath,
    key: group.termKey,
    icon: (
      <img
        className="c-sports-nav-tab__icon"
        src={group.icon}
        alt={group.name}
      />
    ),
    subNav: (group.groups || []).map(subgroup => ({
      text: (
        <>
          {subgroup.flagEmoji}
          {subgroup.name}
        </>
      ),
      path: subgroup.clientPath,
      parentPath: group.clientPath,
      key: group.termKey,
    })),
  });

  render() {
    if (/#event|#bethistory/.test(this.props.currentHash)) {
      return null;
    }

    return (
      <UserNavigationTypedQuery query={USER_NAVIGATION_QUERY}>
        {({ loading, error, data }) => {
          // show skeleton if loading or refetching after updating favourites
          if (loading) {
            return <SportsNavSkeleton />;
          }
          if (error) {
            // TODO: adampilks - handle error here
            return <SportsNavSkeleton />;
          }

          if (!error && data && data.userNavigation) {
            const navItems: Array<SportsNavItemType> = data.userNavigation.map(
              this.mapGroupToNavItem
            );

            if (navItems.length === 0) {
              return <SportsNavSkeleton />;
            }

            const selectedNavItem =
              navItems.find(this.isNavItemSelected) || navItems[0];

            return (
              <>
                <OpenModalMutation variables={{ modal: "CHOOSE_FAVOURITES" }}>
                  {openChooseFavouritesModal => (
                    <SportsMainNav
                      navItems={navItems}
                      onSelected={this.onNavItemSelected}
                      isSelected={this.isNavItemSelected}
                      canEdit={true}
                      onEdit={openChooseFavouritesModal}
                    />
                  )}
                </OpenModalMutation>

                <OpenModalMutation
                  variables={{ modal: "CHOOSE_FAVOURITE_COMPETITIONS" }}
                >
                  {openChooseFavouriteLeaguesModal => (
                    <SportsSubNav
                      navItems={selectedNavItem.subNav || []}
                      onSelected={this.onNavItemSelected}
                      isSelected={this.isNavItemSelected}
                      canEdit={selectedNavItem.key === "football"}
                      onEdit={openChooseFavouriteLeaguesModal}
                    />
                  )}
                </OpenModalMutation>
              </>
            );
          }

          return null;
        }}
      </UserNavigationTypedQuery>
    );
  }
}

export default SportsNav;
