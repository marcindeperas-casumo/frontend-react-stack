import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import React from "react";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/FavouriteCompetitionsCount",
  module
);

stories.add("Default", () => (
  // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsCount' cannot be used as a J... Remove this comment to see the full error message
  <FavouriteCompetitionsCount count={number("Count", 3)} />
));
