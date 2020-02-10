// @flow

export const CMS_SLUGS = {
  BEFORE_PLAYING: "slot-control-system.configure-session-screen",
  AFTER_PLAYING: "slot-control-system.after-playing",
  PERIODIC_REMINDER_NOTIFICATION:
    "slot-control-system.periodic-reminder-notification",
  LIMIT_ALMOST_CONSUMED_NOTIFICATION:
    "slot-control-system.limit-almost-consumed-notification",
  TIME_REMAINING_NOTIFICATION:
    "slot-control-system.time-remaining-notification",
  UNITS: "units",
};

export const ACTION_TYPES = {
  FETCH_SESSION_INIT: "SLOT_CONTROL_SYSTEM/FETCH_SESSION_INIT",
  CREATE_SESSION_INIT: "SLOT_CONTROL_SYSTEM/CREATE_SESSION_INIT",
  UPDATE_SESSION: "SLOT_CONTROL_SYSTEM/UPDATE_SESSION",
  UPDATE_ACTIVE_SESSION_STATS:
    "SLOT_CONTROL_SYSTEM/UPDATE_ACTIVE_SESSION_STATS",
  UPDATE_SLUG_TO_CATEGORY_MAP:
    "SLOT_CONTROL_SYSTEM/UPDATE_SLUG_TO_CATEGORY_MAP",
};

export const END_SESSION_REASONS = Object.freeze({
  LOGGED_OUT: "LOGGED_OUT",
  LIMIT_REACHED: "LIMIT_REACHED",
});
