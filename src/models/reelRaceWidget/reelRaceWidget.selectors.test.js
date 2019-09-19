// import { reelRacePlayerSpinsSelector } from "./reelRaceWidget.selectors";
import { RR_STATE } from "./reelRaceWidget.constants";

const THIRTY_MINUTES = 30 * 60 * 1000;
const now = Date.now();

const reelRaces = {
  "1": {
    tournamentId: "1",
    startTime: now + THIRTY_MINUTES,
    endTime: now + THIRTY_MINUTES * 2,
    opted: false,
    status: RR_STATE.SCHEDULED,
    leaderboard: {
      player1: {
        remainingSpins: 30,
      },
    },
  },
};

describe("Models/reelRaceWidget/Selectors", () => {
  // describe("reelRaceWidgetSelector", () => {
  //   test("should return null if started and not opted in", () => {
  //     const state = { schema: { reelRaces } };
  //     expect(reelRaceWidgetSelector(state)).toEqual(null);
  //   });
  //   test("should return rr if SCHEDULED and player opted in", () => {
  //     const rr = {
  //       "1": {
  //         ...reelRaces["1"],
  //         opted: true,
  //       },
  //     };
  //     const state = { schema: { reelRaces: rr } };
  //     expect(reelRaceWidgetSelector(state)).toEqual(rr["1"]);
  //   });
  //   test("should return rr if STARTED and player opted in", () => {
  //     const rr = {
  //       "1": {
  //         ...reelRaces["1"],
  //         startTime: now - THIRTY_MINUTES,
  //         status: RR_STATE.STARTED,
  //         opted: true,
  //       },
  //     };
  //     const state = { schema: { reelRaces: rr } };
  //     expect(reelRaceWidgetSelector(state)).toEqual(rr["1"]);
  //   });
  // });
  // describe("reelRacePlayerSpinsSelector", () => {
  //   test("should return player remaining spins", () => {
  //     const rr = {
  //       "1": {
  //         ...reelRaces["1"],
  //         opted: true,
  //       },
  //     };
  //     const state = {
  //       handshake: {
  //         app: { "common/composition/session": { id: "player1" } },
  //       },
  //       schema: {
  //         reelRaces: rr,
  //       },
  //     };
  //     expect(reelRacePlayerSpinsSelector(state)).toEqual(30);
  //   });
  // });
});
