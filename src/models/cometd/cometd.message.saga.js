import { put } from "redux-saga/effects";
import { fetchAppHandshake } from "Models/handshake";

export default function* cometdReceiveMessageSaga(action) {
  yield put(fetchAppHandshake());
}
