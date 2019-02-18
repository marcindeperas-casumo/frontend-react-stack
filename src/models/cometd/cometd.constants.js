export const TYPES = {
  COMETD_SUBSCRIBE: "COMETD/SUBSCRIBE",
  COMETD_UNSUBSCRIBE: "COMETD/UNSUBSCRIBE",
  COMETD_MESSAGE: "COMETD/MESSAGE",
};

// Make sure that you record all channel
// names here so we keep them in one place.
export const CHANNELS = {
  JACKPOTS: "/public/jackpotsUpdated",
  LIVE_CASINO_TABLE: "/public/liveCasino/table",
  MUST_DROP_JACKPOTS: "/public/redtiger-jackpots/*",
  PLAYER: "/player",
};

export const MESSAGES = {
  DEPOSIT_CONFIRMED: "depositConfirmed",
};
