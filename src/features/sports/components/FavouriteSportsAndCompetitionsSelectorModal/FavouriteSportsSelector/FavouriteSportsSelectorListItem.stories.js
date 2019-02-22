import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { MockedProviderWithContext } from "Features/sports/state/testUtils";

import {
  withFavouritesResult,
  noFavouritesResult,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";

import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const stories = storiesOf("Sports/FavouriteSportsSelectorListItem", module);

stories.add("Simple", () => {
  return (
    <FavouriteSportsSelectorListItem
      group={noFavouritesResult.groups[1]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={false}
    />
  );
});

stories.add("Simple selected", () => {
  return (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[1]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={true}
    />
  );
});

stories.add("With competition selection", () => {
  return (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[0]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={false}
      showCompetitionIntro={false}
      onAddCompetition={action("onAddCompetition")}
      onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
    />
  );
});

stories.add("With competition selection and selected", () => {
  return (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[0]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={true}
      showCompetitionIntro={false}
      onAddCompetition={action("onAddCompetition")}
      onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
    />
  );
});

stories.add("With competition intro", () => {
  return (
    <MockedProviderWithContext mocks={cmsMocks}>
      <FavouriteSportsSelectorListItem
        group={withFavouritesResult.groups[0]}
        onToggleFavouriteSport={action("onToggleFavouriteSport")}
        isFavourite={true}
        showCompetitionIntro={true}
        onAddCompetition={action("onAddCompetition")}
        onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
      />
    </MockedProviderWithContext>
  );
});
