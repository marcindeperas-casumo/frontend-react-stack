import {
  adventurerSelector,
  adventurerRawSelector,
} from "./adventure.selectors";
import { NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE } from "./adventure.constants";
import { translateTravelModeToSingleLevelProgression } from "./adventure.utils";

const adventurerRaw = {
  belt: "rope",
  inTravelMode: false,
  level: 12,
  levels: [1, 10, 100, 200],
  name: "casumoSmith",
  points: 110,
  pointsRequiredForNextSpaceCrystal: NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
  pointsVersion: 1,
  spaceCrystals: [1],
};
const adventurer = {
  belt: adventurerRaw.belt,
  inBonusMode: adventurerRaw.inTravelMode,
  level: adventurerRaw.level,
  name: adventurerRaw.name,
  points: 10,
  pointsRequiredForNextLevel: 100,
};
const state = {
  schema: {
    adventurer: adventurerRaw,
  },
};
const travellingState = {
  schema: {
    adventurer: {
      ...adventurerRaw,
      inTravelMode: true,
    },
  },
};

describe("Adventure Selectors", () => {
  describe("adventurerRawSelector()", () => {
    test("returns adventurer object if it exists", () => {
      expect(adventurerRawSelector(state)).toEqual(adventurerRaw);
    });

    test("returns {} if adventurer object is missing", () => {
      expect(adventurerRawSelector({})).toEqual({});
    });
  });

  describe("adventurerSelector()", () => {
    test("returns processed travelling adventurer object if it exists", () => {
      const { points, pointsRequiredForNextLevel } =
        translateTravelModeToSingleLevelProgression(
          adventurerRaw.points,
          NUMBER_OF_POINTS_PER_LEVEL_IN_TRAVEL_MODE,
          adventurerRaw.spaceCrystals
        );

      const travellingAdventurer = {
        ...adventurer,
        inBonusMode: true,
        points,
        pointsRequiredForNextLevel,
        level: adventurer.level - 1,
      };
      expect(adventurerSelector(travellingState)).toEqual(travellingAdventurer);
    });

    test("returns processed non-travelling adventurer object if it exists", () => {
      expect(adventurerSelector(state)).toEqual(adventurer);
    });

    test("returns {} if adventurer object is missing", () => {
      expect(adventurerSelector({})).toEqual({});
    });
  });
});
