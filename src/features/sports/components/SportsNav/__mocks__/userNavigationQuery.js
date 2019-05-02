// @flow
import { evolve, take } from "ramda";
import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";
import { USER_NAVIGATION_QUERY } from "../SportsNav";
import mockData from "./userNavigationData";

const labels = {
  all: "All",
  edit: "Edit",
};

const baseMock = {
  request: {
    query: USER_NAVIGATION_QUERY,
  },
  result: {
    data: {
      labels,
      sportsNavigation: mockData,
    },
  },
};

const mockWithXSports = numberOfSports =>
  evolve({
    result: {
      data: {
        labels,
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
