// @flow
import { type SessionEndedCometdMessage } from "Models/slotControlSystem";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";

export default ({
  type: "sometype",
  data: {
    "com.casumo.es.slotsessions.notifications.SessionEndedNotification": endedSessionMock,
  },
}: SessionEndedCometdMessage);