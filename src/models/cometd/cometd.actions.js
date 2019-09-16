import { TYPES, CHANNELS } from "Models/cometd/cometd.constants";

export const subscribe = ({ channel, sessionId }) => {
  return { type: TYPES.COMETD_SUBSCRIBE, channel, sessionId };
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

export const subscribeLiveCasinoUpdates = id => {
  return subscribe({ channel: `${CHANNELS.LIVE_CASINO_TABLE}/${id}` });
};

export const unsubscribeLiveCasinoUpdates = id => {
  return unsubscribe({ channel: `${CHANNELS.LIVE_CASINO_TABLE}/${id}` });
};

export const subscribeMustDropJackpotUpdates = () => {
  return subscribe({ channel: CHANNELS.MUST_DROP_JACKPOTS });
};

export const unsubscribeMustDropJackpotUpdates = () => {
  return unsubscribe({ channel: CHANNELS.MUST_DROP_JACKPOTS });
};

export const subscribeReelRaceUpdates = (channelPrefix, playerId) => {
  return subscribe({
    channel: `${channelPrefix}/tournaments/players/${playerId}/tournamentEvents/entered`,
  });
};

export const unsubscribeReelRaceUpdates = (channelPrefix, playerId) => {
  return unsubscribe({
    channel: `${channelPrefix}/tournaments/players/${playerId}/tournamentEvents/entered`,
  });
};

export const subscribeReelRacePlayerLeaderboard = (
  channelPrefix,
  tournamentId,
  playerId
) => {
  return subscribe({
    channel: `${channelPrefix}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
  });
};

export const unsubscribeReelRacePlayerLeaderboard = (
  channelPrefix,
  tournamentId,
  playerId
) => {
  return unsubscribe({
    channel: `${channelPrefix}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
  });
};

export const subscribeReelRaceLeaderboard = (tournamentId, playerId) => {
  return subscribe({
    channel: `${CHANNELS.REEL_RACES}/tournaments/${tournamentId}/leaderboard/${playerId}`,
  });
};

export const unsubscribeReelRaceLeaderboard = (tournamentId, playerId) => {
  return unsubscribe({
    channel: `${CHANNELS.REEL_RACES}/tournaments/${tournamentId}/leaderboard/${playerId}`,
  });
};

export const subscribeToPlayerUpdates = (playerId, sessionId) => {
  const isAuthenticated = playerId && sessionId;

  if (!isAuthenticated) {
    return { type: TYPES.CANCEL };
  }
  return subscribe({
    channel: `${CHANNELS.PLAYER}/${playerId}`,
    sessionId,
  });
};

export const unsubscribeToPlayerUpdates = playerId => {
  return unsubscribe({
    channel: `${CHANNELS.PLAYER}/${playerId}`,
  });
};

export const subscribeToAdventureUpdates = (playerId, sessionId) => {
  const isAuthenticated = playerId && sessionId;

  if (!isAuthenticated) {
    return { type: TYPES.CANCEL };
  }
  return subscribe({
    channel: `${CHANNELS.ADVENTURE}/${playerId}`,
    sessionId,
  });
};

export const unsubscribeFromAdventureUpdates = playerId => {
  return unsubscribe({
    channel: `${CHANNELS.ADVENTURE}/${playerId}`,
  });
};
