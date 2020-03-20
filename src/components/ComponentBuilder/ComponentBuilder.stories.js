// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import { GameListQuery } from "Components/GameListHorizontal/GameListHorizontalDefault/GameListHorizontalDefault.graphql";
import { gamesListMock } from "Components/GameListHorizontal/GameListHorizontalDefault/__mock__";
import { ComponentBuilderRenderer } from "./ComponentBuilderRenderer";

const componentDefinitions = [
  {
    acf_fc_layout: "HTML_CONTENT",
    html: "<br /><br /><div>This is some custom HTML code.</div>",
  },
  { acf_fc_layout: "GAMES_LIST", id: "latestPlayedGames" },
  {
    acf_fc_layout: "HTML_CONTENT",
    html: "<br /><br /><div>HTML code again.</div><br /><br />",
  },
];

const mocks = [
  {
    request: {
      query: GameListQuery,
      variables: {
        id: "latestPlayedGames",
        numberOfGames: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
      },
    },
    result: {
      data: {
        gamesList: gamesListMock,
      },
    },
  },
];

const stories = storiesOf("ComponentBuilder", module);

const ComponentBuilderRendererStory = () => (
  <MockedProvider mocks={mocks}>
    <ComponentBuilderRenderer componentDefinitions={componentDefinitions} />
  </MockedProvider>
);

stories.add("ComponentBuilderRenderer", ComponentBuilderRendererStory, {
  info: {
    text:
      "This component is rendering out components defined by a data structure.",
  },
});
