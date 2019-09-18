// @flow
import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import waitForExpect from "wait-for-expect";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
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
      <MockedProviderWithContext
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
      </MockedProviderWithContext>
    );
    const renderedNoFavourites = mount(
      <MockedProviderWithContext
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
      </MockedProviderWithContext>
    );

    const renderedNoFavourites = mount(
      <MockedProviderWithContext
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
      </MockedProviderWithContext>
    );

    await wait(20);

    rendered.update();
    renderedNoFavourites.update();

    const selector = {
      backButton: "[data-test='sports-modal-back-button']",
      closeButton: "[data-test='sports-modal-close-button']",
    };

    waitForExpect(() => {
      expect(rendered.find(selector.backButton)).toHaveLength(1);
      expect(rendered.find(selector.backButton)).toBeVisible();
      expect(rendered.find(selector.closeButton)).toHaveLength(1);
      expect(rendered.find(selector.closeButton)).not.toBeVisible();

      expect(renderedNoFavourites.find(selector.backButton)).toHaveLength(1);
      expect(renderedNoFavourites.find(selector.backButton)).not.toBeVisible();
      expect(renderedNoFavourites.find(selector.closeButton)).toHaveLength(1);
      expect(renderedNoFavourites.find(selector.closeButton)).not.toBeVisible();
    });
  });

  test("should call mutation to save new favourites when clicking the save button", () => {
    // TODO:(adampilks)- test for mutation execution when next MockedProvider version is available, currently not possible
  });
});
