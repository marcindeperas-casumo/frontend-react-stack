// @flow
import {
  diffIconLeaderboard,
  diffLeaderboardWidget,
} from "./reelRaces.selectors";

const baseLeaderboardEntry = {
  boosters: {
    winsInARow: 0,
    triples: 0,
    wins: 0,
    bigWins: 0,
    megaWins: 0,
  },
  mostPlayedGame: "yes",
  playerId: "a1",
  playerName: "a1",
  points: 0,
  position: 10,
  remainingSpins: 255,
};
describe("diffIconLeaderboard", () => {
  test("no changes", () => {
    expect(
      diffIconLeaderboard(baseLeaderboardEntry, baseLeaderboardEntry)
    ).toBe(true);
  });

  describe("changes to unrelated fields", () => {
    test("field mostPlayedGame", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          mostPlayedGame: "no",
        })
      ).toBe(true);
    });
    test("field playerId", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          playerId: "newId",
        })
      ).toBe(true);
    });
    test("field boosters.winsInARow", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            winsInARow: 666,
          },
        })
      ).toBe(true);
    });
    test("field boosters.megaWins", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            megaWins: 666,
          },
        })
      ).toBe(true);
    });
  });

  describe("changes to related fields", () => {
    test("field remainingSpins", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          remainingSpins: 0,
        })
      ).toBe(false);
    });
    test("field points", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          points: 666,
        })
      ).toBe(false);
    });
    test("field position", () => {
      expect(
        diffIconLeaderboard(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          position: 1,
        })
      ).toBe(false);
    });
  });
});

describe("diffLeaderboardWidget", () => {
  test("no changes", () => {
    expect(
      diffLeaderboardWidget(baseLeaderboardEntry, baseLeaderboardEntry)
    ).toBe(true);
  });

  describe("changes to unrelated fields", () => {
    test("field mostPlayedGame", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          mostPlayedGame: "no",
        })
      ).toBe(true);
    });
    test("field playerId", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          playerId: "newId",
        })
      ).toBe(true);
    });
    test("field boosters.triples", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            triples: 666,
          },
        })
      ).toBe(true);
    });
    test("field boosters.wins", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            wins: 666,
          },
        })
      ).toBe(true);
    });
  });

  describe("changes to related fields", () => {
    test("field remainingSpins", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          remainingSpins: 0,
        })
      ).toBe(false);
    });
    test("field points", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          points: 666,
        })
      ).toBe(false);
    });
    test("field position", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          position: 1,
        })
      ).toBe(false);
    });
    test("field boosters.megaWins", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            megaWins: 666,
          },
        })
      ).toBe(false);
    });
    test("field boosters.winsInARow", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            winsInARow: 666,
          },
        })
      ).toBe(false);
    });
    test("field boosters.bigWins", () => {
      expect(
        diffLeaderboardWidget(baseLeaderboardEntry, {
          ...baseLeaderboardEntry,
          boosters: {
            ...baseLeaderboardEntry.boosters,
            bigWins: 666,
          },
        })
      ).toBe(false);
    });
  });
});
