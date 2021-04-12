import { SportsShellQuery } from "Models/apollo/queries";

type MockData = {
  hasSelectedFavourites: boolean,
  isSearchVisible: boolean,
};

export type MockResult = {
  data?: MockData,
  error?: any,
  loading?: boolean,
};

export const getQueryMocks = ({ data, loading, error }: MockResult) => [
  {
    request: {
      query: SportsShellQuery,
    },
    result: { data, loading, error },
  },
];
