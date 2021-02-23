import defaultCometD from "Lib/cometd";
import { makeProtocolAwareUrl } from "Utils";

const defaultUrl = makeProtocolAwareUrl("/cometd/");

/* eslint-disable fp/no-mutation, fp/no-delete, fp/no-mutating-methods, sonarjs/cognitive-complexity */
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

  if (__DEV__) {
    window.Debugger = {
      cometd: { emit },
    };
  }

  cometd.init({ url });

  return {
    subscribe,
    unsubscribe,
    emit,
  };

  async function subscribe(channel, callback, ...args) {
    incrementSubcriptionCounter(channel);
    registerSubscriptionCallback(channel, callback);

    if (!subscriptions[channel]) {
      subscriptions[channel] = await cometd.subscribe(
        channel,
        x => (subscriptionCallbacks[channel] || []).forEach(fn => fn(x)),
        ...args
      );
    }
  }

  async function unsubscribe(channel, callback) {
    const subscription = subscriptions[channel];

    unregisterSubscriptionCallback(channel, callback);
    decrementSubscriptionCounter(channel);

    if (subscription && isNoPendingSubscriptions(channel)) {
      await cometd.unsubscribe(subscription);
      delete subscriptions[channel];
      delete subscriptionCallbacks[channel];
    }
  }

  function emit(channel, data) {
    const callbacks = getCallbacksForChannel(channel) || [];
    const callCallback = callback =>
      callback.forEach(fn => fn({ data, channel }));

    callbacks.forEach(callCallback);
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

  function getCallbacksForChannel(channel) {
    // We also wanna get wildcard subscriptions,
    // e.g if the subscription was "/foo/*" and we
    // send a message to "/foo/bar", we still would like to trigger
    // the subscription.
    return Object.keys(subscriptionCallbacks)
      .filter(subscribedChannel => channel.match(subscribedChannel))
      .map(x => subscriptionCallbacks[x]);
  }

  function registerSubscriptionCallback(channel, callback) {
    if (!subscriptionCallbacks[channel]) {
      subscriptionCallbacks[channel] = [];
    }

    subscriptionCallbacks[channel].push(callback);
  }

  function unregisterSubscriptionCallback(channel, callback) {
    const idx = (subscriptionCallbacks[channel] || []).indexOf(callback);

    if (idx !== -1) {
      subscriptionCallbacks[channel].splice(idx, 1);
    }
  }
};
/* eslint-enable fp/no-mutation, fp/no-delete, fp/no-mutating-methods, sonarjs/cognitive-complexity */

export default CometdFactory({ cometd: defaultCometD, url: defaultUrl });
