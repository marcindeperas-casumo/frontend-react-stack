import { select, put } from "redux-saga/effects";
import { liveCasinoUpdatesSaga } from "./liveCasino.updates.saga";
import { liveTableSelector } from "Models/liveCasino";
import { updateEntity } from "Models/schema";
import tableMock from "./__mocks__/liveCasino.state.mock";

describe("Models/LiveCasino/UpdateSaga", () => {
  const action = {
    data: {
      tableId: "munbzmuueehqaavs",
      players: 3,
    },
  };
  const generator = liveCasinoUpdatesSaga(action);
  generator.next();

  test("updates table and finishes after updating", () => {
    const table = tableMock;
    const dispatchedAction = generator.next(table).value.PUT.action;
    const dispatchedTableId = action.data.tableId;
    const dispatchedPlayers =
      dispatchedAction.payload.liveTable[dispatchedTableId].players;

    expect(dispatchedPlayers).toEqual(action.data.players);
    expect(generator.next().done).toBe(true);
  });
});
