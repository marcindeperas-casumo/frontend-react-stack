import { call, put, take } from "redux-saga/effects";
import { eventChannel, buffers } from "redux-saga";
import cometd from "Models/cometd/cometd.service";
import { message } from "Models/cometd/cometd.actions";

// We are using eventChannels to relay cometd messages
// as actions to the redux store.
// Docs: https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md
const setupEmitter = channel => emitter => {
  // TODO: Add throttling to the emitter function
  cometd.subscribe(channel, emitter);

  // We need to return with an unsubscribe function
  // As we will use an other Saga to unsubscribe from
  // channels we are only returning a no-op function here.
  return () => {};
};

export const getCometdMessagesStream = channel => {
  return eventChannel(setupEmitter(channel), buffers.sliding(50));
};

export default function* cometdSubscribeSaga(action) {
  const { channel: subscribedChannel } = action;
  const cometdMessagesStream = yield call(
    getCometdMessagesStream,
    subscribedChannel
  );

  // eslint-disable-next-line fp/no-loops
  while (true) {
    const { channel, data } = yield take(cometdMessagesStream);

    yield put(message({ channel, data }));
  }
}
