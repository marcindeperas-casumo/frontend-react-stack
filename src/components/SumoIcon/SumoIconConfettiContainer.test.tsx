// @flow
import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd/cometd.constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'Components/SumoIcon/SumoIconCo... Remove this comment to see the full error message
import { animation_duration } from "Components/SumoIcon/SumoIconConfetti.scss";
import SumoIconConfettiContainer from "./SumoIconConfettiContainer";

jest.useFakeTimers();

jest.mock("react-redux", () => ({
  useSelector: () => "user-session-id",
}));

describe("SumoIconConfettiContainer", () => {
  test("should render null by default", () => {
    const rendered = mount(<SumoIconConfettiContainer />);
    expect(rendered.find("SumoIconConfetti")).toHaveLength(0);
  });

  test(`should show animation node after LEVEL_UP event received and hide it after ${animation_duration}ms`, () => {
    const wrapper = mount(<SumoIconConfettiContainer />);

    expect(wrapper.find("SumoIconConfetti")).toHaveLength(0);

    wait().then(async () => {
      await jest.advanceTimersByTime(animation_duration);
      cometd.emit(`${CHANNELS.ADVENTURE}/user-session-id`, { leveledUp: 666 });
      wrapper.update();

      expect(wrapper.find("SumoIconConfetti")).toHaveLength(1);
    });

    wait().then(async () => {
      await jest.advanceTimersByTime(animation_duration);
      wrapper.update();
    });

    expect(wrapper.find("SumoIconConfetti")).toHaveLength(0);
  });
});
