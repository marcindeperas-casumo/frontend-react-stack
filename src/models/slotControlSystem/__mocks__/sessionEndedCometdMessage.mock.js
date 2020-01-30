// @flow
import { type SessionEndedCometdMessage } from "Models/slotControlSystem";
import endedSessionMock from "./endedSession.mock";

export default ({
  type: "sometype",
  data: {
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": {
      activeSession: null,
      activeExclusion: null,
      lastEndedSession: endedSessionMock,
    },
  },
}: SessionEndedCometdMessage);