import { put, select } from "redux-saga/effects";
import { liveTableEntitiesSelector, updateEntity } from "Models/schema";

export default function* liveCasinoUpdatesSaga(action) {
  const { data } = action;
  const liveTableById = yield select(liveTableEntitiesSelector);

  const table = liveTableById[data.tableId];

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
