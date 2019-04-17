// @flow

import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import type { Adventurer, AdventurerRaw } from "./adventure.types";
import { NUMBER_OF_LEVELS_IN_TRAVEL_MODE } from "./adventure.constants";

function translateTravelModeToSingleLevelProgression(
  points: number,
  remainingPointsToNextLevel: number,
  spaceCrystals: Array<number>
): any {
  const progressPerLevel = 1 / NUMBER_OF_LEVELS_IN_TRAVEL_MODE;
  const progressBasedOnPreviousLevels = spaceCrystals.length * progressPerLevel;
  const currentLevelProgress = points / remainingPointsToNextLevel;

  return {
    points:
      progressBasedOnPreviousLevels + currentLevelProgress * progressPerLevel,
    pointsRequiredForNextLevel:
      progressBasedOnPreviousLevels + currentLevelProgress,
  };
}

function getProgression(
  data: AdventurerRaw,
  levels: Array<number[]>,
  pointsVersion: number
): any {
  const {
    inTravelMode,
    points,
    pointsRequiredForNextSpaceCrystal,
    spaceCrystals,
  } = data;

  const progressionOutline = levels ? levels[pointsVersion] : [];

  if (inTravelMode) {
    return translateTravelModeToSingleLevelProgression(
      points,
      pointsRequiredForNextSpaceCrystal,
      spaceCrystals
    );
  }

  const pointsRequiredForNextLevel = progressionOutline.reduce(
    (acc, level) => (points > level ? acc + level : acc),
    0
  );

  return {
    points,
    pointsRequiredForNextLevel,
  };
}

export const adventurerSelector: any => Adventurer = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  adventurer => {
    const {
      inTravelMode,
      level,
      levels,
      name,
      belt,
      pointsVersion,
    } = adventurer;
    const { points, pointsRequiredForNextLevel } = getProgression(
      adventurer,
      levels,
      pointsVersion
    );

    return {
      belt,
      inTravelMode,
      level,
      name,
      points,
      pointsRequiredForNextLevel,
    };
  }
);

export const adventurerRawSelector: any => AdventurerRaw = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER]),
  R.identity
);
