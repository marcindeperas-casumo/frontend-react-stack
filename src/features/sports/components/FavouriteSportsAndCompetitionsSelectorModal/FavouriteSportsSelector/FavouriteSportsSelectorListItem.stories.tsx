import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks";
import {
  withFavouritesResult,
  noFavouritesResult,
} from "../StageFavouritesContext/__mocks__/favouriteSportsSelectorContextResult";
import FavouriteSportsSelectorListItem from "./FavouriteSportsSelectorListItem";

const stories = storiesOf("Sports/FavouriteSportsSelectorListItem", module);

stories.add("Simple", () => (
  // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { userFavourite: boolean; favourite... Remove this comment to see the full error message
  <FavouriteSportsSelectorListItem
    group={noFavouritesResult.groups[1]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={false}
  />
));

stories.add("Simple selected", () => (
  // @ts-expect-error ts-migrate(2739) FIXME: Type '{ group: { __typename: string; id: number; u... Remove this comment to see the full error message
  <FavouriteSportsSelectorListItem
    group={withFavouritesResult.groups[1]}
    onToggleFavouriteSport={action("onToggleFavouriteSport")}
    isFavourite={true}
  />
));

stories.add("With competition selection", () => (
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'isOnboarding' is missing in type '{ grou... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2741) FIXME: Property 'isOnboarding' is missing in type '{ grou... Remove this comment to see the full error message
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
    {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'isOnboarding' is missing in type '{ grou... Remove this comment to see the full error message */}
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
