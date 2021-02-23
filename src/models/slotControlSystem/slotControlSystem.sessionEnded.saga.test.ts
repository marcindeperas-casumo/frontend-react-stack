// @flow
import { cloneableGenerator } from "redux-saga/utils";
import { REACT_APP_MODAL } from "Src/constants";
import {
  sessionEndedSaga,
  endedSessionSelector,
  ACTION_TYPES,
  END_SESSION_REASONS,
} from "Models/slotControlSystem";
import { getSessionEndedMessageWithReason } from "Models/slotControlSystem/__mocks__/sessionEndedCometdMessage.mock";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";

const updateSessionTest = (generator, lastEndedSession) => () => {
  const dispatchedAction = generator.next().value.PUT.action;

  expect(dispatchedAction.type).toEqual(ACTION_TYPES.UPDATE_SESSION);

  expect(dispatchedAction.response).toEqual({
    activeSession: null,
    activeExclusion: null,
    lastEndedSession,
  });
};

const selectorTest = generator => () => {
  const selector = generator.next().value.SELECT.selector;

  expect(selector).toEqual(endedSessionSelector);
};

describe("Models/slotControlSystem/sessionEndedSaga", () => {
  describe("flow for endReason being LOGGED_OUT", () => {
    const generator = cloneableGenerator(sessionEndedSaga)(
      getSessionEndedMessageWithReason(END_SESSION_REASONS.LOGGED_OUT)
    );

    test(
      "first updates sessions state",
      updateSessionTest(generator, endedSessionMock)
    );

    test("then it gets endedSession from state", selectorTest(generator));

    test("then saga is done", () => {
      expect(generator.next(endedSessionMock).done).toBe(true);
    });
  });

  describe("flow for endReason being LIMIT_REACHED", () => {
    const modifiedEndedSessionMock = {
      ...endedSessionMock,
      endReason: END_SESSION_REASONS.LIMIT_REACHED,
    };
    const generator = cloneableGenerator(sessionEndedSaga)(
      getSessionEndedMessageWithReason(END_SESSION_REASONS.LIMIT_REACHED)
    );

    test(
      "first updates sessions state",
      updateSessionTest(generator, modifiedEndedSessionMock)
    );

    test("then it gets endedSession from state", selectorTest(generator));

    test("then shows After Limits Reached modal", () => {
      const dispatchedAction = generator.next(modifiedEndedSessionMock).value
        .PUT.action;

      expect(dispatchedAction.type).toEqual("MODAL/SHOW");
      expect(dispatchedAction.modalId).toEqual(
        REACT_APP_MODAL.ID.SLOT_CONTROL_SYSTEM_AFTER_LIMITS_REACHED
      );
    });

    test("then saga is done", () => {
      expect(generator.next().done).toBe(true);
    });
  });
});
