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
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import {
  withFavouritesResult,
  noFavouritesResult,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";
import FavouriteSportsSelector from "./FavouriteSportsSelector";

describe("<FavouriteSportsSelector />", () => {
  test("should render a ListItem for each sport, and 1 for 'All Sports'", async () => {
    const rendered = mount(
      <MockedProviderWithContext
        mocks={[noFavouritesMock, competitionsSuggestionsMock]}
      >
        <StageFavouritesProvider>
          <FavouriteSportsSelector
            onAddCompetition={() => {}}
            showCompetitionIntro={false}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );

    await wait(200);

    rendered.update();

    await waitForExpect(() => {
      expect(rendered.find(FavouriteSportsSelectorListItem).length).toBe(
        noFavouritesResult.groups.length + 1
      );
    });
  });

  test("should render list items in 2 lists, popular & other, depending on whether the sport is popular", async () => {
    const popularCount = withFavouritesResult.groups.filter(g => g.popular)
      .length;
    const otherCount = withFavouritesResult.groups.filter(g => !g.popular)
      .length;

    const rendered = mount(
      <MockedProviderWithContext mocks={[withFavouritesMock]}>
        <StageFavouritesProvider>
          <FavouriteSportsSelector
            onAddCompetition={() => {}}
            showCompetitionIntro={false}
          />
        </StageFavouritesProvider>
      </MockedProviderWithContext>
    );

    await wait(100);

    rendered.update();

    await waitForExpect(() => {
      expect(
        rendered.find("[data-test='favourite-sports-selector-popular']").length
      ).toBe(popularCount);
    });
    await waitForExpect(() => {
      expect(
        rendered.find("[data-test='favourite-sports-selector-all']").length
      ).toBe(1);
    });
    await waitForExpect(() => {
      expect(
        rendered.find("[data-test='favourite-sports-selector-other']").length
      ).toBe(otherCount);
    });
  });
});
