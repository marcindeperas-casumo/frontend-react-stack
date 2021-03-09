import {
  NUMBER_OF_LEVELS_IN_TRAVEL_MODE,
  NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
} from "./adventure.constants";
import { getProgression } from "./adventure.utils";

const points = 110;
const spaceCrystals = [1];
const levels = [1, 10, 100, 200];

const adventurerProgression = {
  points: 10,
  pointsRequiredForNextLevel: 100,
};
const travellingAdventurerProgression = {
  points:
    points + spaceCrystals.length * NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
  pointsRequiredForNextLevel:
    NUMBER_OF_LEVELS_IN_TRAVEL_MODE * NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
};

describe("Adventure Utilities", () => {
  describe("getProgression()", () => {
    test("returns expected adventurer progression for non-travelling adventurer", () => {
      const progression = getProgression(
        false,
        points,
        NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
        spaceCrystals,
        levels
      );

      expect(progression).toEqual(adventurerProgression);
    });
    test("returns expected adventurer progression for travelling adventurer", () => {
      const progression = getProgression(
        true,
        points,
        NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
        spaceCrystals,
        levels
      );

      expect(progression).toEqual(travellingAdventurerProgression);
    });
  });
});
