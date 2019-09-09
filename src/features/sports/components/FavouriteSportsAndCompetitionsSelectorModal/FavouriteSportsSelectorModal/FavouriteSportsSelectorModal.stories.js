// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StageFavouritesProvider } from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal/StageFavouritesContext";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import { ModalsArea } from "Features/sports/components/Modals";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  withFavouritesMock,
  noFavouritesMock,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextQuery";
import competitionsSuggestionsMock from "../StageFavouritesContext/__mocks__/competititonSuggestionsQuery";
import FavouriteSportsSelectorModal from "./FavouriteSportsSelectorModal";

const stories = storiesOf("Sports/FavouriteSportsSelectorModal", module);

stories.add("No favourites", () => (
  <MockedProviderWithContext
    mocks={[noFavouritesMock, competitionsSuggestionsMock, ...cmsMocks]}
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

stories.add("With favourites", () => (
  <MockedProviderWithContext
    mocks={[withFavouritesMock, competitionsSuggestionsMock, ...cmsMocks]}
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
