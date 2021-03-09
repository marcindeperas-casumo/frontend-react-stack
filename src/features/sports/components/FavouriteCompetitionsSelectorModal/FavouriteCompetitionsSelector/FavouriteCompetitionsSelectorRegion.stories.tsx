import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { F } from "ramda";
import footballData from "./__mocks__/football";
import FavouriteCompetitionsSelectorRegion from "./FavouriteCompetitionsSelectorRegion";

const stories = storiesOf(
  "Sports/FavouriteCompetitionsSelectorModal/FavouriteCompetitionsSelector/FavouriteCompetitionsSelectorRegion",
  module
);

stories.add("No selections", () => (
  // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsSelectorRegion' cannot be us... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsSelectorRegion' cannot be us... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsSelectorRegion' cannot be us... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsSelectorRegion' cannot be us... Remove this comment to see the full error message
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
