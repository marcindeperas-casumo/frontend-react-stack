import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TopLists, { getSlug } from "Components/TopLists/TopLists";
import MockStore from "Components/MockStore";
import curated from "Models/curated/__mocks__/curated.json";
import { GAME_LIST_IDS } from "Src/constants";

const language = "en";
const slug = getSlug(language);
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
];

const state = {
  schema: {
    game: {
      "topwheel-treasures": {
        name: "Topwheel Treasures",
        slug: "topwheel-treasures",
        logoBackground:
          "https://cms.casumo.com/wp-content/uploads/2018/08/TopwheelTreasuresBack.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2018/08/TTLogo.png",
        hasPlayForFun: false,
        inMaintenanceMode: false,
        jackpotId: null,
        tableId: "munbzmuueehqaavs",
        lobby: "munbzmuueehqaavs",
      },
    },
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
    <TopLists language={language} />
  </MockStore>
);

stories.add(
  "TopLists",
  TopListsStories,
  info({
    text: "Displays the top lists.",
  })
);
