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
  const accumulatedPoints = pointsBasedOnPreviousLevels + points;
  const maxPointsForSingleLevelProgression =
    NUMBER_OF_LEVELS_IN_TRAVEL_MODE * NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE;

  return {
    points:
      accumulatedPoints > maxPointsForSingleLevelProgression
        ? maxPointsForSingleLevelProgression
        : accumulatedPoints,
    pointsRequiredForNextLevel: maxPointsForSingleLevelProgression,
  };
}

export function getProgression(
  inTravelMode: boolean,
  points: number,
  pointsRequiredForNextSpaceCrystal: number,
  spaceCrystals: Array<number>,
  levels: Array<number>
): AdventurerLevelProgress {
  if (inTravelMode) {
    return translateTravelModeToSingleLevelProgression(
      points,
      pointsRequiredForNextSpaceCrystal,
      spaceCrystals
    );
  }

  const pointsRequiredForNextLevel = levels.reduce(
    (acc, level, index, allLevels) => {
      if (points >= acc) {
        return allLevels[index + 1] || allLevels[index];
      }

      return acc;
    },
    0
  );

  const levelAsIndex = levels.indexOf(pointsRequiredForNextLevel);
  const previousLevelsPointsRequirement = levels[levelAsIndex - 1];

  return {
    points: points - previousLevelsPointsRequirement,
    pointsRequiredForNextLevel:
      pointsRequiredForNextLevel - previousLevelsPointsRequirement,
  };
}
