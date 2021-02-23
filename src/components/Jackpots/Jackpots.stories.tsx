// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Jackpots from "./Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

const stories = storiesOf("Jackpots", module);
const DefaultStory = () => (
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  <Jackpots title="Jackpots" jackpots={jackpotsMock} locale="en" />
);

stories.add("Default", DefaultStory);
