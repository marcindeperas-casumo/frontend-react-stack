// @flow

import { createSelector } from "reselect";
import { compose, not, isNil, pathOr, prop, propOr, identity } from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import { getPage } from "Models/cms";
import { CMS_CONTENT_SLUG } from "./adventure.constants";
import type {
  Adventurer,
  AdventurerRaw,
  AdventureContent,
} from "./adventure.types";
import { getProgression } from "./adventure.utils";

export const adventurerSelector: void => Adventurer = createSelector(
  pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  adventurer => {
    const {
      inTravelMode = false,
      level,
      levels,
      name,
      belt,
      pointsVersion,
    } = adventurer;

    if (!name) {
      return {};
    }

    const { points, pointsRequiredForNextLevel } = getProgression(
      adventurer,
      levels,
      pointsVersion
    );

    return {
      belt,
      inBonusMode: inTravelMode,
      level,
      name,
      points,
      pointsRequiredForNextLevel,
    };
  }
);

export const adventurerRawSelector: void => AdventurerRaw = createSelector(
  pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  identity
);

export const adventureContentSelector: ({}) => AdventureContent = createSelector(
  getPage(CMS_CONTENT_SLUG),
  propOr({}, "fields")
);

export const isAdventurerFetchedSelector = createSelector(
  adventurerRawSelector,
  compose(
    not,
    isNil,
    prop("name")
  )
);
