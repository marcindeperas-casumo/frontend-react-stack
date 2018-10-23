export const TYPES = {
  COMETD_SUBSCRIBE: "COMETD/SUBSCRIBE",
  COMETD_UNSUBSCRIBE: "COMETD/UNSUBSCRIBE",
  COMETD_MESSAGE: "COMETD/MESSAGE",
};

// Make sure that you record all channel
// names here so we keep them in one place.
export const CHANNELS = {
  JACKPOTS: "/public/jackpotsUpdated",
  LIVE_CASINO_ALL: "/public/tables/*",
};
