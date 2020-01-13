export const TYPES = {
  COMETD_SUBSCRIBE: "COMETD/SUBSCRIBE",
  COMETD_UNSUBSCRIBE: "COMETD/UNSUBSCRIBE",
  COMETD_MESSAGE: "COMETD/MESSAGE",
  CANCEL: "COMETD/CANCEL",
};

// Make sure that you record all channel
// names here so we keep them in one place.
export const CHANNELS = {
  JACKPOTS: "/public/jackpotsUpdated",
  LIVE_CASINO_TABLE: "/public/liveCasino/table",
  MUST_DROP_JACKPOTS: "/public/redtiger-jackpots/*",
  REEL_RACES: "/public/tournaments",
  PLAYER: "/player",
  ADVENTURE: "/adventurer",
  SESSION: "/session",
};

export const MESSAGES = {
  DEPOSIT_CONFIRMED: "depositConfirmed",
  NOTIFICATION_ADDED: "notificationAdded",
  ENRICHED_DEPOSIT_CONFIRMED: "enrichedDepositConfirmed",
  SLOT_CONTROL_SYSTEM_STATS_UPDATED:
    "com.casumo.es.slotsessions.notifications.StatsUpdatedNotification",
  SLOT_CONTROL_SYSTEM_SESSION_ENDED:
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification",
};
