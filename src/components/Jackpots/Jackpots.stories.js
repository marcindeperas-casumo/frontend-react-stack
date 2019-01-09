// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import Jackpots from "Components/Jackpots";
import MockStore from "Components/MockStore";

const stories = storiesOf("Jackpots", module);
const DefaultStory = () => (
  <MockStore>
    <Jackpots />
  </MockStore>
);

stories.add("Default", DefaultStory, info({ text: "Default" }));
