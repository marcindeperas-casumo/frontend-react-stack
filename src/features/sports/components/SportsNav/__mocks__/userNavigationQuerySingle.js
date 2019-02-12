// @flow
import { USER_NAVIGATION_QUERY } from "../SportsNav";
import mockData from "./userNavigationData";

export default [
  {
    request: {
      query: USER_NAVIGATION_QUERY,
    },
    result: {
      data: {
        userNavigation: [mockData[1]],
      },
    },
  },
];
