import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SectionsList from "./";
import MockStore from "Components/MockStore";

const stories = storiesOf("SectionsList", module);

const items = [
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
];

const SectionListStories = () => (
  <MockStore>
    <SectionsList items={items} />
  </MockStore>
);

stories.add("Default", () => <SectionListStories />, info({ text: "Default" }));
