// @flow
import { Query } from "react-apollo";
import gql from "graphql-tag";

export const USER_NAVIGATION_QUERY = gql`
  query UserNavigation($live: Boolean!) {
    allLabel: dictionaryTerm(key: "navigation.all")
    editLabel: dictionaryTerm(key: "navigation.edit")
    liveLabel: dictionaryTerm(key: "navigation.live")

    sportsNavigation(live: $live) {
      sport {
        name
        id
        clientPath
        clientPathLive
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
          clientPathLive
          termKey
          regionCode
        }
      }
    }
  }
`;

export class UserNavigationTypedQuery extends Query<UserNavigation, null> {}
