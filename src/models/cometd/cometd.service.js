import cometd from "Lib/cometd";
import { makeProtocolAwareUrl } from "Utils/utils";
import Debugger from "Utils/Debugger";

const url = makeProtocolAwareUrl("/cometd/");

export const CometdFactory = ({ cometd, url }) => {
  // We want to know how many subscriptions happened to a certain channel,
  // so we only unsubscribe finally when there are no more outstanding subscriptions
  // depending on channel updates.
  // Idea: this could be switched out in the future to create lifecycle events in components
  // (e.g. onComponendLoaded('Jackpots')) and there would be a single saga handling the subscriptions
  // and unsubscriptions.
  const subscriptionCounter = {};
  const subscriptions = {};
  const subscriptionCallbacks = {};

  cometd.init({ url });
  Debugger.cometd = {
    emit,
  };

  return {
    subscribe,
    unsubscribe,
    emit,
  };

  async function subscribe(channel, callback, ...args) {
    incrementSubcriptionCounter(channel);

    if (!subscriptions[channel]) {
      subscriptions[channel] = await cometd.subscribe(
        channel,
        callback,
        ...args
      );
      subscriptionCallbacks[channel] = callback;
    }
  }

  async function unsubscribe(channel) {
    const subscription = subscriptions[channel];

    decrementSubscriptionCounter(channel);

    if (subscription && isNoPendingSubscriptions(channel)) {
      await cometd.unsubscribe(subscription);
      delete subscriptions[channel];
      delete subscriptionCallbacks[channel];
    }
  }

  function emit(channel, message) {
    const callback = subscriptionCallbacks[channel];

    if (callback) {
      callback(message);
    }
  }

  function incrementSubcriptionCounter(channel) {
    subscriptionCounter[channel] = subscriptionCounter[channel]
      ? subscriptionCounter[channel] + 1
      : 1;
  }

  function decrementSubscriptionCounter(channel) {
    subscriptionCounter[channel] =
      subscriptionCounter[channel] > 0 ? subscriptionCounter[channel] - 1 : 0;
  }

  function isNoPendingSubscriptions(channel) {
    return !subscriptionCounter[channel];
  }
};

export default CometdFactory({ cometd, url });
