// @flow
import { Query } from "react-apollo";
import gql from "graphql-tag";

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

export class UserNavigationTypedQuery extends Query<UserNavigation, null> {}
