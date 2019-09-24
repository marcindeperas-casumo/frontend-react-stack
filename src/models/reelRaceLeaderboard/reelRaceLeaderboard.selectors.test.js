import {
  reelRaceLeaderboardSelector,
  reelRacePlayerSpinsSelector,
  reelRacePlayerBoostersSelector,
} from "./reelRaceLeaderboard.selectors";

const leaderboard = {
  "123": {
    playerId: "123",
    playerName: "Vesino",
    position: 59,
    points: 0,
    remainingSpins: 250,
    mostPlayedGame: null,
    boosters: {
      winsInARow: 0,
      triples: 0,
      wins: 0,
      bigWins: 0,
      megaWins: 0,
    },
  },
};

describe("Models/reelRaceLeaderboard/Selectors", () => {
  describe("reelRaceLeaderboardSelector", () => {
    test("should return {} if no leaderbboard data", () => {
      const state = { schema: {} };

      expect(reelRaceLeaderboardSelector(state)).toEqual({});
    });

    test("should return leaderboard", () => {
      const state = { schema: { leaderboard } };

      expect(reelRaceLeaderboardSelector(state)).toEqual(leaderboard);
    });
  });

  describe("reelRacePlayerSpinsSelector", () => {
    test("should return null if no leaderboard data", () => {
      const state = { schema: {} };

      expect(reelRacePlayerSpinsSelector(state)).toEqual(null);
    });

    test("should return player spins", () => {
      const state = {
        handshake: {
          app: { "common/composition/session": { id: "123" } },
        },
        schema: { leaderboard },
      };

      expect(reelRacePlayerSpinsSelector(state)).toEqual(250);
    });
  });

  describe("reelRacePlayerBoostersSelector", () => {
    test("should return null if no leaderboard data", () => {
      const state = { schema: {} };

      expect(reelRacePlayerBoostersSelector(state)).toEqual(null);
    });

    test("should return player spins", () => {
      const state = {
        handshake: {
          app: { "common/composition/session": { id: "123" } },
        },
        schema: { leaderboard },
      };

      expect(reelRacePlayerBoostersSelector(state)).toEqual(
        leaderboard["123"].boosters
      );
    });
  });
});
