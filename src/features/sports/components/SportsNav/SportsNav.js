// @flow
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { has } from "ramda";
import { ErrorMessage } from "Components/ErrorMessage";
import { RegionFlag } from "Features/sports/components/RegionFlag";
import {
  NAVIGATE_CLIENT_MUTATION,
  ClientContext,
  OpenModalMutation,
} from "Features/sports/state";
import SportsMainNav from "./SportsMainNav";
import SportsSubNav from "./SportsSubNav";
import SportsNavSkeleton from "./SportsNavSkeleton";
import type { SportsNavItemType } from "./types";

type SportsNavProps = {
  currentHash: string,
};

export const USER_NAVIGATION_QUERY = gql`
  query UserNavigation {
    allLabel: dictionaryTerm(key: "navigation.all")
    editLabel: dictionaryTerm(key: "navigation.edit")

    sportsNavigation {
      sport {
        name
        id
        clientPath
        termKey
        icon
        activeIndicator
        canSelectSubgroups
      }

      subNav {
        competition {
          name
          id
          clientPath
          termKey
          regionCode
        }
      }
    }
  }
`;

class UserNavigationTypedQuery extends Query<UserNavigation, null> {}

export const isNavItemSelected = (
  currentHash: string = "",
  navItem: SportsNavItemType,
  allowSubPathMatching: boolean
) => {
  const isCurrentHash = currentHash === `#${navItem.path}`;
  const isParentPath =
    allowSubPathMatching && currentHash.includes(`${navItem.path}/`);
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

  isNavItemSelected = (
    navItem: SportsNavItemType,
    allowSubPathMatching?: boolean = true
  ) => isNavItemSelected(this.props.currentHash, navItem, allowSubPathMatching);

  onNavItemSelected = (navItem: SportsNavItemType) =>
    onNavItemSelected(this.props.currentHash, navItem, this.context.client);

  mapToNavItem = (
    item: UserNavigation_sportsNavigation
  ): SportsNavItemType => ({
    text: item.sport.name,
    path: item.sport.clientPath,
    key: item.sport.termKey,
    iconProps: {
      iconSrc: item.sport.icon,
      activeIndicatorSrc: item.sport.activeIndicator,
      alt: item.sport.name,
    },
    canEdit: item.sport.canSelectSubgroups,
    subNav: item.subNav.map(subgroup => ({
      text: (
        <>
          {subgroup.competition.regionCode && (
            <RegionFlag
              regionCode={subgroup.competition.regionCode}
              className="u-margin-right"
            />
          )}
          {subgroup.competition.name}
        </>
      ),
      path: subgroup.competition.clientPath,
      parentPath: item.sport.clientPath,
      key: item.sport.termKey,
      canEdit: false,
    })),
  });

  render() {
    // Decision was made that our nav doesn't add any benefit on the following kambi routes
    // and take too much focus away from what is happening
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
            return <ErrorMessage direction="horizontal" />;
          }

          if (
            data &&
            data.sportsNavigation &&
            data.allLabel &&
            data.editLabel
          ) {
            const navItems: Array<SportsNavItemType> = data.sportsNavigation.map(
              this.mapToNavItem
            );

            if (navItems.length === 0) {
              return <SportsNavSkeleton />;
            }

            const selectedNavItem =
              navItems.find(navItem => this.isNavItemSelected(navItem)) ||
              navItems[0];

            const mainNavCacheBuster = [
              selectedNavItem.path,
              ...navItems.map(navItem => navItem.path),
            ].join();
            // $FlowFixMe
            const subNavCacheBuster = selectedNavItem.subNav
              .map(navItem => navItem.path)
              .join();

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
                      editLabel={data.editLabel}
                      cacheBuster={mainNavCacheBuster}
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
                      canEdit={selectedNavItem.canEdit}
                      onEdit={openChooseFavouriteLeaguesModal}
                      allLabel={data.allLabel}
                      editLabel={data.editLabel}
                      cacheBuster={subNavCacheBuster}
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
