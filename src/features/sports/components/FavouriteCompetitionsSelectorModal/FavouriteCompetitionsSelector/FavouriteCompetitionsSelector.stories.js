// @flow
import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { F } from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";
import { FavouriteCompetitionsSelector } from "./FavouriteCompetitionsSelector";
import favouriteCompetitionsSelectorMocks from "./__mocks__/favouriteCompetitionsSelectorQuery";
import Skeleton from "./FavouriteCompetitionsSelectorSkeleton";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector",
  module
);

stories.add("Default", () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <FavouriteCompetitionsSelector
      groupId={1}
      isCompetitionSelected={F}
      toggleCompetition={action("toggleCompetition")}
    />
  </MockedProvider>
));

stories.add("Loading", () => <Skeleton />);

stories.add("With selections", () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <FavouriteCompetitionsSelector
      groupId={1}
      isCompetitionSelected={id => id % 3 === 0}
      toggleCompetition={action("toggleCompetition")}
    />
  </MockedProvider>
));
