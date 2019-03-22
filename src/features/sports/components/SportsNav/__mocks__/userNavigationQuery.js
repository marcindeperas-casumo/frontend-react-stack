// @flow
import { evolve, take } from "ramda";
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

const mockWithXSports = numberOfSports =>
  evolve({
    result: {
      data: {
        sportsNavigation: take(numberOfSports),
      },
    },
  });

const manySports = [baseMock];
const multipleSports = [mockWithXSports(3)(baseMock)];
const singleSport = [mockWithXSports(1)(baseMock)];
const error = [{ ...baseMock, error: true }];

export default {
  manySports,
  multipleSports,
  singleSport,
  error,
};
