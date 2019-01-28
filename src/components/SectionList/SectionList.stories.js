import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SectionList from "./";
import { sortGamesByName, getAlphabeticalSections } from "./utils";
import GameRowSearch from "Components/GameRowSearch";
import MockStore from "Components/MockStore";

const stories = storiesOf("SectionList", module);

const sortedGames = sortGamesByName([
  "mega-fortune-dreams",
  "mega-fortune",
  "hall-of-gods",
  "mega-moolah",
  "divine-fortune",
  "dancing-in-rio",
  "irish-riches",
  "top-cat",
  "power-force-heroes",
  "monkeys-millions",
  "keystone-kops",
  "jackpot-diamonds",
]);

const sections = getAlphabeticalSections(sortedGames);

const renderSectionHeader = title => (
  <p className="u-font-weight-bold u-font-md u-padding-vert--md">{title}</p>
);

const SectionListStories = () => (
  <MockStore>
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={id => <GameRowSearch id={id} />}
    />
  </MockStore>
);

stories.add(
  "Alphabetical",
  () => <SectionListStories />,
  info({ text: "alphabetical" })
);
