// @flow
import React from "react";
import { mount } from "enzyme";
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
});
