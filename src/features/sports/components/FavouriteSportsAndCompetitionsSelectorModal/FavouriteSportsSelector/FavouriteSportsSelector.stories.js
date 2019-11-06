// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/react-testing";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
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
  <MockedProvider
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
  </MockedProvider>
));

stories.add("With favourites", () => (
  <MockedProvider
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
  </MockedProvider>
));

stories.add("With favourites, first time", () => (
  <MockedProvider
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
  </MockedProvider>
));

stories.add("First time, Sports Player", () => (
  <MockedProvider
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
  </MockedProvider>
));

stories.add("First time, Casino Player", () => (
  <MockedProvider
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
  </MockedProvider>
));
