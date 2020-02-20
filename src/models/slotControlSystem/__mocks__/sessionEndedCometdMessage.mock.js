// @flow
import { type SessionEndedCometdMessage, END_SESSION_REASONS } from "Models/slotControlSystem";
import endedSessionMock from "./endedSession.mock";

export function getSessionEndedMessageWithReason(
  endReason: any = END_SESSION_REASONS.LOGGED_OUT
): SessionEndedCometdMessage {
  return {
    type: "sometype",
    data: {
      "com.casumo.es.slotsessions.notifications.SessionEndedNotification": {
        activeSession: null,
        activeExclusion: null,
        lastEndedSession: {
          ...endedSessionMock,
          endReason,
        },
      },
    },
  };
}

export default getSessionEndedMessageWithReason();