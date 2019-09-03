import { reelRaceWidgetSelector } from "./reelRaceWidget.selectors";

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
    status: "Started",
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
    status: "Scheduled",
  },
};
const state = {
  schema: {
    reelRaces,
    game,
  },
};

describe("Models/reelRaceWidget/Selectors", () => {
  test("reelRaceWidgetSelector returns reel race", () => {
    expect(reelRaceWidgetSelector(state)).toEqual(reelRaces["6c8ea8b0"]);
  });
});
