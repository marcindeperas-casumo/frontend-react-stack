import { reelRacesUpdatesSaga } from "./reelRaces.saga.updates";

describe("Models/reelRaces/UpdateSaga", () => {
  const action = {
    data: {
      tournamentId: "58d314cd-b960-35bd-b691-67604993b4b7",
    },
  };
  const generator = reelRacesUpdatesSaga(action);
  generator.next();

  test("updates tournament and finishes after updating", () => {
    const selectedReelRaces = {};
    const dispatchedAction = generator.next(selectedReelRaces).value.PUT.action;

    expect(dispatchedAction.payload).toEqual({
      reelRaces: {
        [action.data.tournamentId]: {
          opted: true,
        },
      },
    });

    expect(generator.next().done).toBe(true);
  });
});
