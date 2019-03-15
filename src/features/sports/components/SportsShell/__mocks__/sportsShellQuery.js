// @flow
import { SPORTS_SHELL_QUERY } from "../SportsShellContainer";

type MockData = {
  hasSelectedFavourites: boolean,
  searchVisible: boolean,
};

export type MockResult = {
  data?: MockData,
  error?: any,
  loading?: boolean,
};

export const getQueryMocks = ({ data, loading, error }: MockResult) => [
  {
    request: {
      query: SPORTS_SHELL_QUERY,
    },
    result: { data, loading, error },
  },
];
