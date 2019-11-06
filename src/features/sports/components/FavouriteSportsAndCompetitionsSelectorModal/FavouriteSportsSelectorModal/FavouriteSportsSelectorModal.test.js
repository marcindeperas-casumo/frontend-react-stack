// @flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { actWait, waitAndUpdateWrapper } from "Utils";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { selectors } from "Features/sports/components/SportsModal/SportsModalHeader.test";
import {
  withFavouritesMock,
  noFavouritesMock,
  PlayerVerticalCasinoMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import FavouriteSportsSelectorModal from "./FavouriteSportsSelectorModal";

describe("<FavouriteSportsSelectorModal />", () => {
  test("should render save button only when there are selected sports", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={[
          withFavouritesMock,
          competitionsSuggestionsMock,
          PlayerVerticalCasinoMock,
        ]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProvider>
    );
    const renderedNoFavourites = mount(
      <MockedProvider
        mocks={[
          noFavouritesMock,
          competitionsSuggestionsMock,
          PlayerVerticalCasinoMock,
        ]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProvider>
    );

    await actWait(20);
    await waitAndUpdateWrapper(rendered);
    await waitAndUpdateWrapper(renderedNoFavourites);

    expect(rendered.find("ModalButtonFooter").length).toBe(1);
    expect(renderedNoFavourites.find("ModalButtonFooter").length).toBe(0);
  });

  test("should not show close button if user has no favourites'", async () => {
    const rendered = mount(
      <MockedProvider
        mocks={[
          withFavouritesMock,
          competitionsSuggestionsMock,
          PlayerVerticalCasinoMock,
        ]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProvider>
    );
    const renderedNoFavourites = mount(
      <MockedProvider
        mocks={[
          noFavouritesMock,
          competitionsSuggestionsMock,
          PlayerVerticalCasinoMock,
        ]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProvider>
    );

    await actWait(20);
    await waitAndUpdateWrapper(rendered);
    await waitAndUpdateWrapper(renderedNoFavourites);

    expect(selectors.isBackButtonHidden(rendered)).toBe(true);
    expect(selectors.isCloseButtonHidden(rendered)).toBe(false);
    expect(selectors.isBackButtonHidden(renderedNoFavourites)).toBe(true);
    expect(selectors.isCloseButtonHidden(renderedNoFavourites)).toBe(true);
  });

  // test("should call mutation to save new favourites when clicking the save button", () => {
  //   TODO:(adampilks)- test for mutation execution when next MockedProvider version is available, currently not possible
  // });
});
