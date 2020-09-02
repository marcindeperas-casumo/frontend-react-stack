// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MustDropJackpotList } from "Components/MustDropJackpotList/MustDropJackpotList";
import jackpots from "./__mocks__/response.games.mock";

const stories = storiesOf("MustDropJackpotList", module);

const MustDropJackpotListStories = () => (
  <MustDropJackpotList jackpots={jackpots} />
);

stories.add("MustDropJackpotList", MustDropJackpotListStories);
