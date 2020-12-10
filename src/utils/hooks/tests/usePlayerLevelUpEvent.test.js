// @flow
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import { HookWrapper } from "Utils/HookWrapper";
import { usePlayerLevelUpEvent } from "../usePlayerLevelUpEvent";

jest.useFakeTimers();

jest.mock("react-redux", () => ({
  useSelector: () => "user-session-id",
}));

const emit = cometd.emit;
const subscribe = cometd.subscribe;

describe("useLoginSessionSummary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it should allow subscribe for LEVEL_UP event", async () => {
    cometd.subscribe = jest.fn();

    const wrapper = mount(
      <HookWrapper hook={usePlayerLevelUpEvent} args={[]} />
    );

    const { hook } = wrapper.find("div").props();
    expect(hook.setLevelUpCallback).toBeTruthy();

    await act(async () => {
      await jest.runAllTimers();
      wrapper.update();
    });

    expect(hook.setLevelUpCallback).toBeTruthy();

    const callbackOnEvent = ev => jest.fn();

    await act(async () => {
      await jest.runAllTimers();
      hook.setLevelUpCallback(callbackOnEvent);
      wrapper.update();
    });

    expect(cometd.subscribe).toBeCalled();
  });

  test("it should invoke subscribe callback on emit LEVEL_UP event", async () => {
    cometd.emit = emit;
    cometd.subscribe = subscribe;

    const wrapper = mount(
      <HookWrapper hook={usePlayerLevelUpEvent} args={[]} />
    );

    const { hook } = wrapper.find("div").props();

    await act(async () => {
      await jest.runAllTimers();
      wrapper.update();
    });

    const callbackOnEvent = jest.fn();

    await act(async () => {
      await jest.runAllTimers();
      hook.setLevelUpCallback(callbackOnEvent);
      cometd.emit(`${CHANNELS.ADVENTURE}/user-session-id`, { leveledUp: 666 });
      wrapper.update();
    });

    expect(callbackOnEvent).toBeCalled();
  });
});
