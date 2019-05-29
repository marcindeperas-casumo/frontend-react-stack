import gql from "graphql-tag";

export const USE_VALUABLE = gql`
  mutation UseValuable($id: String!, $targetSource: String) {
    useValuable(id: $id, targetSource: $targetSource) {
      id
      targetSource
    }
  }
`;
