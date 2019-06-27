// @flow
import { evolve, take } from "ramda";
import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";
import { OPEN_MODAL_MUTATION } from "Features/sports/state";
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

const createOpenModalMockResponse: () => () => {
  data: boolean,
} = () => jest.fn().mockImplementation(() => ({ data: true }));

export const openModalMutationMocks = {
  chooseFavourites: {
    request: {
      query: OPEN_MODAL_MUTATION,
      variables: { modal: "CHOOSE_FAVOURITES" },
    },
    result: createOpenModalMockResponse(),
  },
  chooseFavouriteCompetitions: {
    request: {
      query: OPEN_MODAL_MUTATION,
      variables: { modal: "CHOOSE_FAVOURITE_COMPETITIONS" },
    },
    result: createOpenModalMockResponse(),
  },
};

export const error = [{ ...baseMock, error: true }];
export const singleSport = [mockWithXSports(1)(baseMock)];
export const manySports = [baseMock];
export const multipleSports = [
  mockWithXSports(3)(baseMock),
  openModalMutationMocks.chooseFavourites,
  openModalMutationMocks.chooseFavouriteCompetitions,
];
