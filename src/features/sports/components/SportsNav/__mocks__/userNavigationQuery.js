// @flow
import { evolve, take } from "ramda";
import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";
import { USER_NAVIGATION_QUERY } from "../SportsNav";
import { userNavigationData } from "./userNavigationData";

const labels = {
  allLabel: "All",
  editLabel: "Edit",
};

const baseMock = {
  request: {
    query: USER_NAVIGATION_QUERY,
  },
  result: {
    data: {
      ...labels,
      sportsNavigation: userNavigationData,
    },
  },
};

const mockWithXSports = numberOfSports =>
  evolve({
    result: {
      data: {
        ...labels,
        sportsNavigation: take(numberOfSports),
      },
    },
  });

export const manySports = [baseMock];
export const multipleSports = [mockWithXSports(3)(baseMock)];
export const singleSport = [mockWithXSports(1)(baseMock)];
export const error = [{ ...baseMock, error: true }];
