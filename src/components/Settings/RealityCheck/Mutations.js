import gql from "graphql-tag";

export const UPDATE_REALITY_CHECK_INTERVAL = gql`
  mutation UpdateRealityCheckInterval($input: UpdateRealityCheckIntervalInput) {
    updateRealityCheckInterval(input: $input)
  }
`;
