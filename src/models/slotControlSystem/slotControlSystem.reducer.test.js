// @flow
import {
  ACTION_TYPES,
  slotControlSystemReducer,
} from "Models/slotControlSystem";

describe("Models/slotControlSystem/Reducer", () => {
  const now = Date.now();
  let nowSpy;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    nowSpy.mockClear();
  });

  test("UPDATE_SESSION", () => {
    const response = { id: "123-123-456" };
    const action = { type: ACTION_TYPES.UPDATE_SESSION, response };
    const state = {
      activeSession: null,
      updatedAt: null,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeSession: response,
      updatedAt: now,
    });
  });

  test("INVALIDATE_SESSION", () => {
    const activeSession = {
      id: "123-345-456-677",
    };
    const action = { type: ACTION_TYPES.INVALIDATE_SESSION };
    const state = {
      activeSession,
      updatedAt: now,
    };

    expect(slotControlSystemReducer(state, action)).toEqual({
      activeSession: null,
      updatedAt: now,
    });
  });
});
