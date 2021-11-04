import { ACTION_TYPES } from "Models/player";

export const setPlayerLogoutStarted = () => ({
  type: ACTION_TYPES.SET_LOGOUT_STARTED,
});

export const setSessionTimerStarted = () => ({
  type: ACTION_TYPES.SET_SESSION_STARTED,
});
