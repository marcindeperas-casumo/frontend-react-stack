// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Jackpots from "./Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

const stories = storiesOf("Jackpots", module);
const DefaultStory = () => (
  <Jackpots title="Jackpots" jackpots={jackpotsMock} />
);

stories.add("Default", DefaultStory);
