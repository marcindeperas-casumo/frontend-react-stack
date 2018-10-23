import { put, take } from "redux-saga/effects";
import { normalizeData } from "Reducers/schema/schema";
import { actions as schemaActions } from "Reducers/schema";
import { types, initFetch } from "Reducers/curated";

export function* fetchPageSaga(action) {
  yield put(initFetch());

  const { response } = yield take(types.CURATED_FETCH_PAGE_COMPLETE);
  const { entities } = normalizeData(response);

  yield put(schemaActions.updateEntity(entities));
}
