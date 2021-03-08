import { fork } from "redux-saga/effects";
import cometd from "Models/cometd/cometd.service";

export default function* cometdUnsubscribeSaga(action) {
  const { channel } = action;

  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  yield fork(cometd.unsubscribe, channel);
}
