// @flow
import React from "react";
import { MockedProvider } from "react-apollo/test-utils";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import cmsMocks from "Features/sports/components/DictionaryTerm/__mocks__/cmsMocks.js";
import { ModalsArea } from "Features/sports/components/Modals";
import FavouriteCompetitionsSelectorModal from "./FavouriteCompetitionsSelectorModal";
import favouriteCompetitionsSelectorMocks from "./FavouriteCompetitionsSelector/__mocks__/favouriteCompetitionsSelectorQuery";

const mocks = [...cmsMocks, ...favouriteCompetitionsSelectorMocks];

const stories = storiesOf("Sports/FavouriteCompetitionsSelectorModal", module);

stories.add(
  "No selections made",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModalsArea>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          onClose={action("onClose")}
          onSave={action("onSave")}
          initiallySelectedCompetitions={[]}
        />
      </ModalsArea>
    </MockedProvider>
  ),
  info({ text: "No selections made" })
);

stories.add(
  "With back button",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModalsArea>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          onClose={action("onClose")}
          onBack={action("onBack")}
          onSave={action("onSave")}
          initiallySelectedCompetitions={[]}
        />
      </ModalsArea>
    </MockedProvider>
  ),
  info({ text: "No selections made" })
);

stories.add(
  "With selections",
  () => (
    <MockedProvider mocks={mocks} addTypename={false}>
      <ModalsArea>
        <FavouriteCompetitionsSelectorModal
          groupId={1}
          onClose={action("onClose")}
          onSave={action("onSave")}
          initiallySelectedCompetitions={[
            { id: 1000094985 },
            { id: 1000094981 },
            { id: 1000093381 },
          ]}
        />
      </ModalsArea>
    </MockedProvider>
  ),
  info({ text: "With selections" })
);
