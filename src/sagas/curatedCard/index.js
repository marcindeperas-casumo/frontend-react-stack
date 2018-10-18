import { actions as curatedActions, types } from "Reducers/curatedCard";
import { actions as schemaActions } from "Reducers/schema";
import { normalizeData } from "Reducers/schema/schema";
import { call, put, take } from "redux-saga/effects";

export function* fetchCuratedCardSaga() {
  yield put(curatedActions.fetchCuratedCard());

  // Pause execution until the fetchCuratedCard request is completed, then
  // normalize and update the store
  const { response } = yield take(types.FETCH_CURATED_COMPLETE);
  const { entities } = yield call(normalizeData, response);

  yield put(schemaActions.updateEntity(entities));
}
