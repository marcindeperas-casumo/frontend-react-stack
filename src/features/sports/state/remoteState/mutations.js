import gql from "graphql-tag";

export const TOGGLE_FAVOURITE_GROUP_MUTATION = gql`
  mutation ToggleFavouriteGroup($id: Int!) {
    toggleFavouriteGroup(id: $id) {
      id
      userFavourite
    }
  }
`;

export const SET_FAVOURITES = gql`
  mutation SetFavourites($ids: [Int!]!) {
    setFavouriteGroups(ids: $ids) {
      id
      userFavourite
    }
  }
`;

export const SET_FAVOURITE_COMPETITIONS = gql`
  mutation SetFavouriteCompetitions($groupId: Int!, $ids: [Int!]!) {
    setFavouriteCompetitions(groupId: $groupId, ids: $ids) {
      id
      userFavourite
    }
  }
`;
