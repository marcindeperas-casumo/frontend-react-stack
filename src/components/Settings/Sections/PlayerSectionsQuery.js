import gql from "graphql-tag";

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
