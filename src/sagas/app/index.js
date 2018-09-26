import { fetchHandshake } from "Reducers/handshake/actions";
import { put } from "redux-saga/effects";

export function* appSaga() {
  yield put(fetchHandshake());
}

export default appSaga;
