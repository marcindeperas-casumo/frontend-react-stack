// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import { cmsImageMocks } from "Features/sports/components/CmsImage";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  withFavouritesMock,
  noFavouritesMock,
  PlayerVerticalCasinoMock,
  PlayerVerticalSportsMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import FavouriteSportsSelector from "./FavouriteSportsSelector";

const stories = storiesOf("Sports/FavouriteSportsSelector", module);

stories.add("Default", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      PlayerVerticalSportsMock,
      competitionsSuggestionsMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <FavouriteSportsSelector
        onAddCompetition={action("onAddCompetition")}
        showCompetitionIntro={false}
      />
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("With favourites", () => (
  <MockedProviderWithContext
    mocks={[
      withFavouritesMock,
      PlayerVerticalSportsMock,
      competitionsSuggestionsMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <FavouriteSportsSelector
        onAddCompetition={action("onAddCompetition")}
        showCompetitionIntro={false}
      />
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("With favourites, first time", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      PlayerVerticalSportsMock,
      competitionsSuggestionsMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <FavouriteSportsSelector
        onAddCompetition={action("onAddCompetition")}
        showCompetitionIntro={true}
      />
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("First time, Sports Player", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      PlayerVerticalSportsMock,
      competitionsSuggestionsMock,
      ...cmsImageMocks,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <FavouriteSportsSelector
        onAddCompetition={action("onAddCompetition")}
        showCompetitionIntro={true}
      />
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("First time, Casino Player", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      PlayerVerticalCasinoMock,
      competitionsSuggestionsMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <FavouriteSportsSelector
        onAddCompetition={action("onAddCompetition")}
        showCompetitionIntro={true}
      />
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));
