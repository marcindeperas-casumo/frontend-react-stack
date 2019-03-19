// @flow
import { assocPath } from "ramda";
import { USER_NAVIGATION_QUERY } from "../SportsNav";
import mockData from "./userNavigationData";

const baseMock = {
  request: {
    query: USER_NAVIGATION_QUERY,
  },
  result: {
    data: {
      sportsNavigation: mockData,
    },
  },
};

export default {
  multipleSports: [baseMock],
  singleSport: [
    assocPath(["result", "data", "sportsNavigation"], [mockData[0]], baseMock),
  ],
  error: [assocPath(["error"], true, baseMock)],
  loading: [assocPath(["result"], undefined, baseMock)],
};
