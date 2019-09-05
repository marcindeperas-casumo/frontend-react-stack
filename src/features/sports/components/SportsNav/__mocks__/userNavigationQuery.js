// @flow
import { evolve, take } from "ramda";
import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";
import { OPEN_MODAL_MUTATION } from "Models/apollo/mutations";
import { USER_NAVIGATION_QUERY } from "Features/sports/components/SportsNav/SportsNavQueries";
import { userNavigationData } from "./userNavigationData";

const labels = {
  allLabel: "All",
  editLabel: "Edit",
  liveLabel: "Live",
};

const liveMock = {
  request: {
    query: USER_NAVIGATION_QUERY,
    variables: {
      live: true,
    },
  },
  result: {
    data: {
      ...labels,
      sportsNavigation: take(2, userNavigationData),
    },
  },
};

const nonLiveMock = {
  request: {
    query: USER_NAVIGATION_QUERY,
    variables: {
      live: false,
    },
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

export const error = [{ ...nonLiveMock, error: true }];
export const singleSport = [mockWithXSports(1)(nonLiveMock), liveMock];
export const multipleSports = [mockWithXSports(3)(nonLiveMock), liveMock];
export const manySports = [nonLiveMock, liveMock];
