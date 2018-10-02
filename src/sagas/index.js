import { types as appTypes } from "Reducers/app";
import { types as fetchTypes } from "Reducers/fetch";
import { fork, takeEvery } from "redux-saga/effects";
import { appSaga } from "Sagas/app";
import { fetchSaga } from "Sagas/fetch";

export default function* rootSaga() {
  yield fork(takeEvery, appTypes.APP_STARTED, appSaga);
  yield fork(takeEvery, fetchTypes.FETCH, fetchSaga);
}
