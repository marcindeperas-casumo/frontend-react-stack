import {
  reelRacesSelector,
  reelRacesByIdSelector,
  reelRacesIdsSelector,
} from "./reelRaces.selectors";

const THIRTY_MINUTES = 30 * 60 * 1000;
const now = Date.now();
const game = {
  "game-1": "game-1",
  "game-2": "game-1",
};
const reelRaces = {
  "6c8ea8b0": {
    tournamentId: "6c8ea8b0",
    startTime: now + THIRTY_MINUTES,
    endTime: now + THIRTY_MINUTES * 2,
    minBet: "$0.20",
    spins: 11,
    promoted: false,
    gameSlug: "game-1",
    opted: false,
    color: "#ffcd32",
    prize: "$666",
  },
  "6c8ea8b1": {
    tournamentId: "6c8ea8b1",
    startTime: now + THIRTY_MINUTES * 2,
    endTime: now + THIRTY_MINUTES * 3,
    minBet: "$2.00",
    spins: 500,
    promoted: false,
    gameSlug: "game-2",
    opted: false,
    color: "#f00",
    prize: "$1000",
  },
};
const state = {
  schema: {
    reelRaces,
    game,
  },
};

describe("Reel Races Selectors", () => {
  describe("reelRacesSelector()", () => {
    test("returns reelRaces object if exist", () => {
      expect(reelRacesSelector(state)).toEqual(reelRaces);
    });

    test("returns {} is reelRaces object is missing", () => {
      expect(reelRacesSelector({})).toEqual({});
    });
  });

  describe("reelRacesByIdSelector()", () => {
    test("returns reelRaces object if exist", () => {
      expect(reelRacesByIdSelector("6c8ea8b0")(state)).toEqual(
        reelRaces["6c8ea8b0"]
      );
    });

    test("returns null if requested id doesn't exist", () => {
      expect(reelRacesByIdSelector("doesn't exist")(state)).toEqual(undefined);
    });
  });

  describe("reelRacesIdsSelector()", () => {
    test("returns reelRaces object if exist", () => {
      expect(reelRacesIdsSelector(state)).toEqual(["6c8ea8b0", "6c8ea8b1"]);
    });

    test("returns {} if reelRaces object is missing", () => {
      expect(reelRacesIdsSelector({})).toEqual([]);
    });
  });
});
