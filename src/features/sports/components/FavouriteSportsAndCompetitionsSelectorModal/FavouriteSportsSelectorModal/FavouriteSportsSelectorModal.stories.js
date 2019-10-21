// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import { ModalsArea } from "Features/sports/components/Modals";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import { cmsImageMocks } from "Features/sports/components/CmsImage";
import {
  withFavouritesMock,
  noFavouritesMock,
  PlayerVerticalCasinoMock,
  PlayerVerticalSportsMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import FavouriteSportsSelectorModal from "./FavouriteSportsSelectorModal";

const stories = storiesOf("Sports/FavouriteSportsSelectorModal", module);

stories.add("No favourites - Casino User", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      competitionsSuggestionsMock,
      PlayerVerticalCasinoMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <ModalsArea>
        <FavouriteSportsSelectorModal
          onClose={action("onClose")}
          onAddCompetition={action("onAddCompetition")}
        />
      </ModalsArea>
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("With favourites - Casino User", () => (
  <MockedProviderWithContext
    mocks={[
      withFavouritesMock,
      competitionsSuggestionsMock,
      PlayerVerticalCasinoMock,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <ModalsArea>
        <FavouriteSportsSelectorModal
          onClose={action("onClose")}
          onAddCompetition={action("onAddCompetition")}
        />
      </ModalsArea>
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));

stories.add("No favourites - Sports User", () => (
  <MockedProviderWithContext
    mocks={[
      noFavouritesMock,
      competitionsSuggestionsMock,
      PlayerVerticalSportsMock,
      ...cmsImageMocks,
      ...cmsMocks,
    ]}
  >
    <StageFavouritesProvider>
      <ModalsArea>
        <FavouriteSportsSelectorModal
          onClose={action("onClose")}
          onAddCompetition={action("onAddCompetition")}
        />
      </ModalsArea>
    </StageFavouritesProvider>
  </MockedProviderWithContext>
));
