import { reelRacesUpdatesSaga } from "./reelRaces.saga.update";

describe("Models/reelRaces/UpdateSaga", () => {
  const action = {
    data: {
      tournamentId: "58d314cd-b960-35bd-b691-67604993b4b7",
    },
  };
  const generator = reelRacesUpdatesSaga(action);
  generator.next();

  test("updates tournament and finishes after updating", () => {
    const dispatchedAction = generator.next({}).value.PUT.action;

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
