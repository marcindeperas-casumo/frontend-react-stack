import { call, put, take, select } from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";
import cometd from "Models/cometd/cometd.service";
import { message } from "Models/cometd/cometd.actions";
import { session as sessionSelector } from "Models/handshake";

// We are using eventChannels to relay cometd messages
// as actions to the redux store.
// Docs: https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md
const setupEmitter = (channel, props) => emitter => {
  // TODO: Add throttling to the emitter function
  cometd.subscribe(channel, emitter, props);

  // We need to return with an unsubscribe function
  // As we will use an other Saga to unsubscribe from
  // channels we are only returning a no-op function here.
  return () => {};
};

export const getCometdMessagesStream = (channel, ...props) => {
  return eventChannel(setupEmitter(channel, ...props), buffers.sliding(50));
};

export default function* cometdSubscribeSaga(action) {
  const { channel: subscribedChannel } = action;
  const session = yield select(sessionSelector);
  const subscribeProps = {
    sessionId: session.sessionId,
  };
  const cometdMessagesStream = yield call(
    getCometdMessagesStream,
    subscribedChannel,
    subscribeProps
  );

  // eslint-disable-next-line fp/no-loops
  while (true) {
    const { channel, data } = yield take(cometdMessagesStream);

    yield put(message({ channel, data }));
  }
}
