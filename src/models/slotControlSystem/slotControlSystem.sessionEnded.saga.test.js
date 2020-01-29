// @flow
import { REACT_APP_MODAL } from "Src/constants";
import { sessionEndedSaga, ACTION_TYPES } from "Models/slotControlSystem";
import sessionEndedCometdMessageMock from "Models/slotControlSystem/__mocks__/sessionEndedCometdMessage.mock";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";

describe("Models/slotControlSystem/sessionEndedSaga", () => {
  const generator = sessionEndedSaga(sessionEndedCometdMessageMock);

  test("first updates sessions state", () => {
    const dispatchedAction = generator.next().value.PUT.action;

    expect(dispatchedAction.type).toEqual(ACTION_TYPES.UPDATE_SESSION);

    expect(dispatchedAction.response).toEqual({
      activeSession: null,
      activeExclusion: null,
      lastEndedSession: endedSessionMock,
    });
  });

  test("then shows After Limits Reached modal", () => {
    const dispatchedAction = generator.next().value.PUT.action;

    expect(dispatchedAction.type).toEqual("MODAL/SHOW");
    expect(dispatchedAction.modalId).toEqual(
      REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED
    );
  });

  test("then saga is done", () => {
    expect(generator.next().done).toBe(true);
  });
});
