// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TopLists, { getSlug } from "Components/TopLists/TopLists";
import MockStore from "Components/MockStore";
import curated from "Models/curated/__mocks__/curated.json";
import { GAME_LIST_IDS } from "Src/constants";

const market = "gb_en";
const slug = getSlug(market);
const stories = storiesOf("TopLists", module);
const componentDefinition = [
  {
    acf_fc_layout: "CURATED_CARD",
    card: ["curated-gb_en"],
  },
  {
    acf_fc_layout: "GAMES_LIST",
    id: GAME_LIST_IDS.EXCLUSIVE_GAMES,
  },
  { acf_fc_layout: "GAMES_LIST", id: GAME_LIST_IDS.POPULAR_GAMES },
  { acf_fc_layout: "JACKPOTS" },
  {
    acf_fc_layout: "TILE_LIST_HORIZONTAL",
    title: "Game Providers",
    type: "game-providers",
  },
];

const state = {
  schema: {
    cms: {
      [slug]: {
        fields: {
          content_builder: componentDefinition,
        },
      },
      "curated.curated-gb_en": {
        fields: curated,
      },
    },
  },
};

const TopListsStories = () => (
  <MockStore state={state}>
    <TopLists
      market={market}
      fetchTopLists={() => {}}
      isGameListLoaded={true}
    />
  </MockStore>
);

stories.add(
  "TopLists",
  TopListsStories,
  info({
    text: "Displays the top lists.",
  })
);
