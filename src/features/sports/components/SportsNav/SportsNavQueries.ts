import { gql } from "@apollo/client";

export const USER_NAVIGATION_QUERY = gql`
  query UserNavigation($live: Boolean!) {
    allLabel: dictionaryTerm(key: "navigation.all")
    editLabel: dictionaryTerm(key: "navigation.edit")
    liveLabel: dictionaryTerm(key: "navigation.live")
    allSportsLabel: dictionaryTerm(key: "favourite-sports-selector.heading.all")
    virtualsSportsLabel: dictionaryTerm(key: "virtuals")

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
