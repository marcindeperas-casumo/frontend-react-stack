import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  withFavouritesResult,
  noFavouritesResult,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const stories = storiesOf("Sports/FavouriteSportsSelectorListItem", module);

stories.add(
  "Simple",
  () => (
    <FavouriteSportsSelectorListItem
      group={noFavouritesResult.groups[1]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={false}
    />
  ),
  info({ text: "Simple" })
);

stories.add(
  "Simple selected",
  () => (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[1]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={true}
    />
  ),
  info({ text: "Simple selected" })
);

stories.add(
  "With competition selection",
  () => (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[0]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={false}
      showCompetitionIntro={false}
      onAddCompetition={action("onAddCompetition")}
      onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
    />
  ),
  info({ text: "With competition selection" })
);

stories.add(
  "With competition selection and selected",
  () => (
    <FavouriteSportsSelectorListItem
      group={withFavouritesResult.groups[0]}
      onToggleFavouriteSport={action("onToggleFavouriteSport")}
      isFavourite={true}
      showCompetitionIntro={false}
      onAddCompetition={action("onAddCompetition")}
      onRemoveFavouriteCompetition={action("onRemoveFavouriteCompetition")}
    />
  ),
  info({ text: "With competition selection and selected" })
);

stories.add(
  "With competition intro",
  () => (
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
  ),
  info({ text: "With competition intro" })
);
