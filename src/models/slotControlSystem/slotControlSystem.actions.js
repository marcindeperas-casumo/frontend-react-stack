// @flow
import { getActiveSession, createSession } from "Api/api.esSlotSessions";
import { types as fetchTypes } from "Models/fetch";
import { ACTION_TYPES } from "Models/slotControlSystem";

export function initFetchActiveSessionAction() {
  return {
    type: fetchTypes.FETCH,
    name: ACTION_TYPES.FETCH_SESSION_INIT,
    asyncCall: getActiveSession,
    postFetch: ACTION_TYPES.UPDATE_SESSION,
  };
}

export function initCreateSessionAction() {
  return {
    type: fetchTypes.FETCH,
    method: "POST",
    name: ACTION_TYPES.CREATE_SESSION_INIT,
    asyncCall: createSession,
    postFetch: ACTION_TYPES.UPDATE_SESSION,
  };
}
