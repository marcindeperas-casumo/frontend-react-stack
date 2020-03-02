// @flow
import React from "react";
import { F } from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import footballData from "./__mocks__/football";
import FavouriteCompetitionsSelectorRegion from "./FavouriteCompetitionsSelectorRegion";

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/FavouriteCompetitionsSelectorRegion",
  module
);

stories.add("No selections", () => (
  <FavouriteCompetitionsSelectorRegion
    group={footballData.data.group.groups[1]}
    isExpanded={false}
    isSelected={F}
    onClick={action("Competition clicked")}
    groupId={1}
    sportName={"test"}
    sportId={2}
    isOnboarding={false}
  />
));

stories.add("No selections - expanded", () => (
  <FavouriteCompetitionsSelectorRegion
    group={footballData.data.group.groups[1]}
    isExpanded={true}
    isSelected={F}
    onClick={action("Competition clicked")}
    groupId={1}
    sportName={"test"}
    sportId={2}
    isOnboarding={false}
  />
));

stories.add("With selections", () => (
  <FavouriteCompetitionsSelectorRegion
    group={footballData.data.group.groups[2]}
    isExpanded={false}
    isSelected={id => id % 2 === 0}
    onClick={action("Competition clicked")}
    groupId={1}
    sportName={"test"}
    sportId={2}
    isOnboarding={false}
  />
));

stories.add("With selections - expanded", () => (
  <FavouriteCompetitionsSelectorRegion
    group={footballData.data.group.groups[2]}
    isExpanded={true}
    isSelected={id => id % 2 === 0}
    onClick={action("Competition clicked")}
    groupId={1}
    sportName={"test"}
    sportId={2}
    isOnboarding={false}
  />
));
