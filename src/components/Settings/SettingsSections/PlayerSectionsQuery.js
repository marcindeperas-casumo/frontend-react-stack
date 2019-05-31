import gql from "Components/Settings/SettingsSections/graphql-tag";

export const PLAYER_SECTIONS_QUERY = gql`
  query PLAYER_SECTIONS_QUERY {
    player {
      id
      loginHistory {
        loginTime
      }
    }
  }
`;
