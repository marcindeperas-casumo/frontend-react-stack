// @flow
import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import waitForExpect from "wait-for-expect";

import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";

import {
  withFavouritesMock,
  noFavouritesMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";

import FavouriteSportsSelectorModal from "./FavouriteSportsSelectorModal";

describe("<FavouriteSportsSelectorModal />", () => {
  test("should render save button only when there are selected sports", async () => {
    const rendered = mount(
      <MockedProviderWithContext
        mocks={[withFavouritesMock, competitionsSuggestionsMock]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );
    const renderedNoFavourites = mount(
      <MockedProviderWithContext
        mocks={[noFavouritesMock, competitionsSuggestionsMock]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );

    await wait(20);

    rendered.update();
    renderedNoFavourites.update();

    waitForExpect(() => {
      expect(rendered.find("ModalButtonFooter").length).toBe(1);
      expect(renderedNoFavourites.find("ModalButtonFooter").length).toBe(0);
    });
  });

  test("should not show close button if user has no favourites'", async () => {
    const rendered = mount(
      <MockedProviderWithContext
        mocks={[withFavouritesMock, competitionsSuggestionsMock]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );
    const renderedNoFavourites = mount(
      <MockedProviderWithContext
        mocks={[noFavouritesMock, competitionsSuggestionsMock]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelectorModal
            onAddCompetition={() => {}}
            onClose={() => {}}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );

    await wait(20);

    rendered.update();
    renderedNoFavourites.update();

    waitForExpect(() => {
      expect(rendered.find("Modal").props().dismissType).toBe("back");
      expect(renderedNoFavourites.find("Modal").props().dismissType).toBe(
        "none"
      );
    });
  });

  test("should call mutation to save new favourites when clicking the save button", () => {
    // TODO:(adampilks)- test for mutation execution when next MockedProvider  version is available, currently not possible
  });
});
