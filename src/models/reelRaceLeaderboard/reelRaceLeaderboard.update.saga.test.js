import { updateLeaderboardSaga } from "./reelRaceLeaderboard.update.saga";

describe("Models/reelRaceLeaderboard/updateLeaderboardSaga", () => {
  const action = { data: { leaderboard: { "123": "123" } } };
  const generator = updateLeaderboardSaga(action);
  generator.next();

  test("should update tournament leaderboard and finish", () => {
    const selectedReelRaces = {};
    const dispatchedAction = generator.next(selectedReelRaces).value.PUT.action;

    expect(dispatchedAction.payload).toEqual({
      reelRaces: {
        [action.data.tournamentId]: action.data,
      },
    });

    expect(generator.next().done).toBe(true);
  });
});
