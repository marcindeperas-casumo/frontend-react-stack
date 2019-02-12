import { put } from "redux-saga/effects";
import { fetchAppHandshake } from "Models/handshake";

//TODO: only update handshake when deposit confirmed
export function* handshakeUpdateSaga(action) {
  yield put(fetchAppHandshake());
}
