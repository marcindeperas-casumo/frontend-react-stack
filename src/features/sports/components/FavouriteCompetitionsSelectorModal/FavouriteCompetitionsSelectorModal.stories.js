// @flow
import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { F } from "ramda";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { action } from "@storybook/addon-actions";

import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";

import FavouriteCompetitionsSelectorModal from "./FavouriteCompetitionsSelectorModal";
import favouriteCompetitionsSelectorMocks from "./FavouriteCompetitionsSelector/__mocks__/favouriteCompetitionsSelectorQuery";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

const stories = storiesOf("Sports/FavouriteCompetitionsSelectorModal", module);

const preselectedCompetitions = [
  { id: 1000094985 },
  { id: 1000094981 },
  { id: 1000093381 },
];

stories.add(
  "No selections made",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <FavouriteCompetitionsSelectorModal
        groupId={1}
        onCancel={action("onCancel")}
        onSave={action("onSave")}
        initiallySelectedCompetitions={[]}
      />
    </MockedProvider>
  ),
  info({ text: "No selections made" })
);

stories.add(
  "With selections",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <FavouriteCompetitionsSelectorModal
        groupId={1}
        onCancel={action("onCancel")}
        onSave={action("onSave")}
        initiallySelectedCompetitions={[
          { id: 1000094985 },
          { id: 1000094981 },
          { id: 1000093381 },
        ]}
      />
    </MockedProvider>
  ),
  info({ text: "With selections" })
);
