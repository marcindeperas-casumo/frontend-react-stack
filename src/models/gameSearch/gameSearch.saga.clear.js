import { call, put } from "redux-saga/effects";
import { normalizeData, updateEntity } from "Models/schema";
import { gameSearchEntities } from "Models/gameSearch";

export function* clearSearchSaga() {
  const { entities } = yield call(
    normalizeData,
    gameSearchEntities({ games: [] })
  );

  yield put(updateEntity(entities));
}
