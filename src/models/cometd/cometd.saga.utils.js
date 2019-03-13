import { TYPES } from "./cometd.constants";

// Takes a channel name and returns a pattern function
// which matches for cometd-messages sent to the target channel.
//
// Usage:
//    takeEvery(takeChannel('/foo/bar'), yourSaga)
export const takeChannel = targetChannel => ({ type, channel }) =>
  type === TYPES.COMETD_MESSAGE &&
  (channel === targetChannel || Boolean(channel.match(targetChannel)));

export const takeMessageFromChannel = (targetChannel, targetMessage) => ({
  type,
  channel,
  data,
}) =>
  type === TYPES.COMETD_MESSAGE &&
  (channel === targetChannel || Boolean(channel.match(targetChannel))) &&
  data[targetMessage];
