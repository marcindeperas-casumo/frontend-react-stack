// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/FavouriteCompetitionsCount",
  module
);

stories.add(
  "Default",
  () => <FavouriteCompetitionsCount count={number("Count", 3)} />,
  info({ text: "Default" })
);
