import { getSessionState, createSession } from "Api/api.esSlotSessions";
import { types as fetchTypes } from "Models/fetch";
import { ACTION_TYPES } from "Models/slotControlSystem";
import type {
  NewSessionRequestType,
  ActiveSessionType,
} from "Models/slotControlSystem";

export function initFetchActiveSessionAction() {
  return {
    type: fetchTypes.FETCH,
    name: ACTION_TYPES.FETCH_SESSION_INIT,
    asyncCall: getSessionState,
    postFetch: ACTION_TYPES.UPDATE_SESSION,
  };
}

export function initCreateSessionAction(asyncCallData: NewSessionRequestType) {
  return {
    type: fetchTypes.FETCH,
    method: "POST",
    name: ACTION_TYPES.CREATE_SESSION_INIT,
    asyncCall: createSession,
    asyncCallData,
    postFetch: ACTION_TYPES.UPDATE_SESSION,
  };
}

export function updateActiveSessionStats(data: ActiveSessionType) {
  return {
    type: ACTION_TYPES.UPDATE_ACTIVE_SESSION_STATS,
    data,
  };
}

export function updateSlugToCategoryMap(slug: string, category: string) {
  return {
    type: ACTION_TYPES.UPDATE_SLUG_TO_CATEGORY_MAP,
    slug,
    category,
  };
}
