import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/react-testing";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  withFavouritesResult,
  noFavouritesResult,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const stories = storiesOf("Sports/FavouriteSportsSelectorListItem", module);

stories.add("Simple", () => (
  <FavouriteSportsSelectorListItem
    group={noFavouritesResult.groups[1]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={false}
  />
));

stories.add("Simple selected", () => (
  <FavouriteSportsSelectorListItem
    group={withFavouritesResult.groups[1]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={true}
  />
));

stories.add("With competition selection", () => (
  <FavouriteSportsSelectorListItem
    group={withFavouritesResult.groups[0]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={false}
    showCompetitionIntro={false}
    onAddCompetition={action("onAddCompetition")}
    onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
  />
));

stories.add("With competition selection and selected", () => (
  <FavouriteSportsSelectorListItem
    group={withFavouritesResult.groups[0]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={true}
    showCompetitionIntro={false}
    onAddCompetition={action("onAddCompetition")}
    onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
  />
));

stories.add("With competition intro", () => (
  <MockedProvider mocks={cmsMocks}>
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[0]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={true}
      showCompetitionIntro={true}
      onAddCompetition={action("onAddCompetition")}
      onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
    />
  </MockedProvider>
));
