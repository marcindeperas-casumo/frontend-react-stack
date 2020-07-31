// @flow
import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { actWait, waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
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
});
