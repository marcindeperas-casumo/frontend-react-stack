// @flow
import * as React from "react";
import * as R from "ramda";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useActiveGameSession } from "./useActiveGameSession";
const slotControlSystem = require("Models/slotControlSystem/slotControlSystem.actions");
// $FlowIgnore
slotControlSystem.initFetchActiveSessionAction = jest.fn();
slotControlSystem.initFetchActiveSessionAction.mockImplementation(() => ({
  type: "mocked",
}));

const now = Date.now();
const activeSession = { id: "123-123-123", lastUpdateTime: now };
const state = {
  slotControlSystem: {
    activeSession,
    lastEndedSession: null,
  },
};

describe("useActiveGameSession", () => {
  const wrapper = mount(
    <MockStore state={state}>
      <HookWrapper hook={useActiveGameSession} args={[]} />
    </MockStore>
  );

  test("returns proper session from store", () => {
    expectHook(wrapper).toEqual(activeSession);
  });

  test("initFetchActiveSessionAction is called only once", () => {
    R.times(() => wrapper.update(), 13);
    expect(slotControlSystem.initFetchActiveSessionAction).toBeCalledTimes(1);
    R.times(() => wrapper.update(), 21);
    expect(slotControlSystem.initFetchActiveSessionAction).toBeCalledTimes(1);
  });
});
