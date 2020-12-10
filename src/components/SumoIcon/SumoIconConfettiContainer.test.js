// @flow
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
import SumoIconConfettiContainer from "./SumoIconConfettiContainer";

jest.useFakeTimers();

const ANIM_TIMEOUT = 3000;

jest.mock("react-redux", () => ({
  useSelector: () => "user-session-id",
}));

describe("SumoIconConfettiContainer", () => {
  test("should render null by default", () => {
    const rendered = mount(<SumoIconConfettiContainer />);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(rendered.find("SumoIconConfetti")).toHaveLength(0);
  });

  test(`should show animation node after LEVEL_UP event received and hide it after ${ANIM_TIMEOUT}`, async () => {
    const wrapper = mount(<SumoIconConfettiContainer />);

    expect(wrapper.find("SumoIconConfetti")).toHaveLength(0);

    act(() => jest.runAllTimers());

    await act(async () => {
      await jest.runAllTimers();
      cometd.emit(`${CHANNELS.ADVENTURE}/user-session-id`, { leveledUp: 666 });
      wrapper.update();
    });

    expect(wrapper.find("SumoIconConfetti")).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(ANIM_TIMEOUT);
      wrapper.update();
    });

    expect(wrapper.find("SumoIconConfetti")).toHaveLength(0);
  });
});
