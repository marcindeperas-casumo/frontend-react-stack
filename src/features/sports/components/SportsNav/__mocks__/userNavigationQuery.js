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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ sportsNavigation: { (xs: string): string; ... Remove this comment to see the full error message
      data: {
        ...labels,
        sportsNavigation: take(numberOfSports),
      },
    },
  });

export const error = [{ ...nonLiveMock, error: true }];
// @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
export const singleSport = [mockWithXSports(1)(nonLiveMock), liveMock];
// @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
export const multipleSports = [mockWithXSports(3)(nonLiveMock), liveMock];
export const manySports = [nonLiveMock, liveMock];
