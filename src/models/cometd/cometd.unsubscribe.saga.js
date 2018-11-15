import { fork } from "redux-saga/effects";
import cometd from "Models/cometd/cometd.service";

export default function* cometdUnsubscribeSaga(action) {
  const { channel } = action;

  yield fork(cometd.unsubscribe, channel);
}
