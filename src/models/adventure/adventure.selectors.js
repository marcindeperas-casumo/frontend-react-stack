// @flow

import { createSelector } from "reselect";
import * as R from "ramda";
import { ENTITY_KEYS } from "Models/schema";
import type {
  AdventurerDetails,
  AdventurerProgression,
  AdventurerProgressionRaw,
} from "./adventure.types";
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
  data: AdventurerProgressionRaw,
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

export const adventurerProgressionSelector: any => AdventurerProgression = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER_PROGRESSION]),
  adventurerProgression => {
    const {
      inTravelMode,
      level,
      levels,
      pointsVersion,
    } = adventurerProgression;
    const { points, pointsRequiredForNextLevel } = getProgression(
      adventurerProgression,
      levels,
      pointsVersion
    );

    return {
      level,
      inTravelMode,
      points,
      pointsRequiredForNextLevel,
    };
  }
);

export const adventurerProgressionRawSelector: any => AdventurerProgression = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER_PROGRESSION]),
  R.identity
);

export const adventurerDetailsSelector: any => AdventurerDetails = createSelector(
  R.pathOr({}, ["schema", ENTITY_KEYS.ADVENTURER_DETAILS]),
  R.identity
);
