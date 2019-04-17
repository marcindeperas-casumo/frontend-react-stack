// @flow

import {
  NUMBER_OF_LEVELS_IN_TRAVEL_MODE,
  NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
} from "./adventure.constants";
import type {
  AdventurerRaw,
  AdventurerLevelProgress,
  BeltType,
} from "./adventure.types";

export function translateBeltNumberToColour(belt: number = 0) {
  const belts: Array<BeltType> = [
    "rope",
    "white",
    "yellow",
    "red",
    "blue",
    "purple",
    "black",
    "sensei",
  ];

  return belts[belt];
}

export function translateTravelModeToSingleLevelProgression(
  points: number,
  requiredPointsForNextLevel: number,
  spaceCrystals: Array<number>
): AdventurerLevelProgress {
  const pointsBasedOnPreviousLevels =
    spaceCrystals.length * NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE;

  return {
    points: pointsBasedOnPreviousLevels + points,
    pointsRequiredForNextLevel:
      NUMBER_OF_LEVELS_IN_TRAVEL_MODE *
      NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
  };
}

export function getProgression(
  rawAdventurerData: AdventurerRaw,
  levels: Array<number[]>,
  pointsVersion: number
): AdventurerLevelProgress {
  const {
    inTravelMode,
    points,
    pointsRequiredForNextSpaceCrystal,
    spaceCrystals,
  } = rawAdventurerData;

  if (inTravelMode) {
    return translateTravelModeToSingleLevelProgression(
      points,
      pointsRequiredForNextSpaceCrystal,
      spaceCrystals
    );
  }

  const progressionOutline =
    levels && levels[pointsVersion] ? levels[pointsVersion] : [];

  const pointsRequiredForNextLevel = progressionOutline.reduce(
    (acc, level, index, allLevels) => {
      if (points >= acc) {
        return allLevels[index + 1] ? allLevels[index + 1] : allLevels[index];
      }

      return acc;
    },
    0
  );

  return {
    points,
    pointsRequiredForNextLevel,
  };
}
