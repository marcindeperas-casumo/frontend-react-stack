// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";

import { MockedProviderWithContext } from "Features/sports/state/testUtils";

import {
  withFavouritesMock,
  noFavouritesMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";

import FavouriteSportsSelector from "./FavouriteSportsSelector";

const stories = storiesOf("Sports/FavouriteSportsSelector", module);

stories.add("Default", () => {
  return (
    <MockedProviderWithContext
      mocks={[noFavouritesMock, competitionsSuggestionsMock, ...cmsMocks]}
    >
      <StageFavouritesProvider>
        <FavouriteSportsSelector
          onAddCompetition={action("onAddCompetition")}
          showCompetitionIntro={false}
        />
      </StageFavouritesProvider>
    </MockedProviderWithContext>
  );
});

stories.add("With favourites", () => {
  return (
    <MockedProviderWithContext
      mocks={[withFavouritesMock, competitionsSuggestionsMock, ...cmsMocks]}
    >
      <StageFavouritesProvider>
        <FavouriteSportsSelector
          onAddCompetition={action("onAddCompetition")}
          showCompetitionIntro={false}
        />
      </StageFavouritesProvider>
    </MockedProviderWithContext>
  );
});

stories.add("With favourites, first time", () => {
  return (
    <MockedProviderWithContext
      mocks={[withFavouritesMock, competitionsSuggestionsMock, ...cmsMocks]}
    >
      <StageFavouritesProvider>
        <FavouriteSportsSelector
          onAddCompetition={action("onAddCompetition")}
          showCompetitionIntro={true}
        />
      </StageFavouritesProvider>
    </MockedProviderWithContext>
  );
});
