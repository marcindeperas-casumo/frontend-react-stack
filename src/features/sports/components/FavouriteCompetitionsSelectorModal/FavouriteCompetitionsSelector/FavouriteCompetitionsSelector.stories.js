// @flow
import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { F } from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";
import FavouriteCompetitionsSelector from "./FavouriteCompetitionsSelector";
import favouriteCompetitionsSelectorMocks from "./__mocks__/favouriteCompetitionsSelectorQuery";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector",
  module
);

stories.add(
  "Default",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <FavouriteCompetitionsSelector
        groupId={1}
        isCompetitionSelected={F}
        toggleCompetition={action("toggleCompetition")}
      />
    </MockedProvider>
  ),
  info({ text: "Default" })
);

stories.add(
  "With selections",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <FavouriteCompetitionsSelector
        groupId={1}
        isCompetitionSelected={id => id % 3 === 0}
        toggleCompetition={action("toggleCompetition")}
      />
    </MockedProvider>
  ),
  info({ text: "Default" })
);
