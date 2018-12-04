import { put, select } from "redux-saga/effects";
import { updateEntity } from "Models/schema";
import { liveTableSelector } from "Models/liveCasino";

export function* liveCasinoUpdatesSaga(action) {
  const { data } = action;
  const table = yield select(liveTableSelector(data.tableId));

  if (table) {
    const liveTable = {
      [data.tableId]: {
        ...table,
        ...data,
      },
    };

    yield put(updateEntity({ liveTable }));
  }
}
