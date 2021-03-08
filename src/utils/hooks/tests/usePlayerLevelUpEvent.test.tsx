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

  test("it should invoke subscribe callback on emit LEVEL_UP event", () => {
    cometd.emit = emit;
    cometd.subscribe = subscribe;

    const callbackOnEvent = jest.fn();
    const wrapper = mount(
      <HookWrapper hook={usePlayerLevelUpEvent} args={[callbackOnEvent]} />
    );

    act(() => {
      cometd.emit(`${CHANNELS.ADVENTURE}/user-session-id`, { leveledUp: 666 });
      wrapper.update();
    });

    expect(callbackOnEvent).toBeCalled();
  });
});
