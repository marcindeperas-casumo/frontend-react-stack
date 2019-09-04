// @flow
import React from "react";
import { shallow, mount } from "enzyme";
import wait from "waait";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import favouriteCompetitionsSelectorMocks from "Features/sports/components/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/__mocks__/favouriteCompetitionsSelectorQuery.js";
import FavouriteSportsAndCompetitionsSelectorModal from "./FavouriteSportsAndCompetitionsSelectorModal";
import {
  withFavouritesMock,
  noFavouritesMock,
} from "./StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "./StageFavouritesContext/__mocks__/competititonSuggestionsQuery";

const mocks = [
  ...favouriteCompetitionsSelectorMocks,
  ...cmsMocks,
  withFavouritesMock,
  noFavouritesMock,
  competitionsSuggestionsMock,
];

describe("<FavouriteSportsAndCompetitionsSelectorModal />", () => {
  test("should show sports selector by default", () => {
    const rendered = shallow(
      <FavouriteSportsAndCompetitionsSelectorModal onClose={() => {}} />
    );

    expect(rendered.find("FavouriteSportsSelectorModal")).toHaveLength(1);
    expect(rendered.find("FavouriteCompetitionsSelectorModal")).toHaveLength(0);
  });
});
