// @flow
import { SPORTS_SHELL_QUERY } from "../SportsShellContainer";

export default [
  {
    request: {
      query: SPORTS_SHELL_QUERY,
    },
    result: {
      data: {
        hasSelectedFavourites: true,
        searchVisible: false,
      },
    },
  },
];
