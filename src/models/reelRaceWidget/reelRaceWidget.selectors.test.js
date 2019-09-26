import {
  reelRaceStartedSelector,
  reelRaceScheduledSelector,
} from "./reelRaceWidget.selectors";
import { REEL_RACE_STATE } from "./reelRaceWidget.constants";

const THIRTY_MINUTES = 30 * 60 * 1000;
const now = Date.now();

const reelRaces = {
  "1": {
    tournamentId: "1",
    startTime: now + THIRTY_MINUTES,
    endTime: now + THIRTY_MINUTES * 2,
    opted: false,
    status: REEL_RACE_STATE.SCHEDULED,
    leaderboard: {
      player1: {
        remainingSpins: 30,
      },
    },
  },
};

describe("Models/reelRaceWidget/Selectors", () => {
  describe("reelRaceStartedSelector", () => {
    test("should return null if started and not opted in", () => {
      const state = { schema: { reelRaces } };

      expect(reelRaceStartedSelector(state)).toEqual(null);
    });

    test("should return null if SCHEDULED and player opted in", () => {
      const rr = {
        "1": {
          ...reelRaces["1"],
          opted: true,
        },
      };
      const state = { schema: { reelRaces: rr } };

      expect(reelRaceStartedSelector(state)).toEqual(null);
    });

    test("should return rr if STARTED and player opted in", () => {
      const rr = {
        "1": {
          ...reelRaces["1"],
          startTime: now - THIRTY_MINUTES,
          status: REEL_RACE_STATE.STARTED,
          opted: true,
        },
      };
      const state = { schema: { reelRaces: rr } };

      expect(reelRaceStartedSelector(state)).toEqual(rr["1"]);
    });
  });

  describe("reelRaceScheduledSelector", () => {
    test("should return null if started and not opted in", () => {
      const state = { schema: { reelRaces } };

      expect(reelRaceScheduledSelector(state)).toEqual(null);
    });

    test("should return null if STARTED and player opted in", () => {
      const rr = {
        "1": {
          ...reelRaces["1"],
          startTime: now - THIRTY_MINUTES,
          status: REEL_RACE_STATE.STARTED,
          opted: true,
        },
      };
      const state = { schema: { reelRaces: rr } };

      expect(reelRaceScheduledSelector(state)).toEqual(null);
    });

    test("should return rr if SCHEDULED and player opted in", () => {
      const rr = {
        "1": {
          ...reelRaces["1"],
          opted: true,
        },
      };
      const state = { schema: { reelRaces: rr } };

      expect(reelRaceScheduledSelector(state)).toEqual(rr["1"]);
    });
  });
});
