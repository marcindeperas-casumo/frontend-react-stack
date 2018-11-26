import { TYPES, CHANNELS } from "Models/cometd/cometd.constants";

export const subscribe = ({ channel }) => {
  return { type: TYPES.COMETD_SUBSCRIBE, channel };
};

export const unsubscribe = ({ channel }) => {
  return { type: TYPES.COMETD_UNSUBSCRIBE, channel };
};

export const message = ({ channel, data }) => {
  return { type: TYPES.COMETD_MESSAGE, channel, data };
};

export const subscribeJackpotUpdates = () => {
  return subscribe({ channel: CHANNELS.JACKPOTS });
};

export const unsubscribeJackpotUpdates = () => {
  return unsubscribe({ channel: CHANNELS.JACKPOTS });
};

export const subscribeLiveCasinoUpdates = () => {
  return subscribe({ channel: CHANNELS.LIVE_CASINO_ALL });
};

export const unsubscribeLiveCasinoUpdates = () => {
  return unsubscribe({ channel: CHANNELS.LIVE_CASINO_ALL });
};

export const subscribeMustDropJackpotUpdates = () => {
  return subscribe({ channel: CHANNELS.MUST_DROP_JACKPOTS });
};

export const unsubscribeMustDropJackpotUpdates = () => {
  return unsubscribe({ channel: CHANNELS.MUST_DROP_JACKPOTS });
};
