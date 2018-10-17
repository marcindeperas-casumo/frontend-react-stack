import React from "react";
import { shallow } from "enzyme";
import Timer from "./Timer";
import { Settings } from "luxon";

const createMockRaf = require("mock-raf");
const mockRaf = createMockRaf();

describe("Timer", () => {
  let endTime;

  beforeEach(() => {
    endTime = new Date(Date.UTC(2018, 1, 1, 1, 1, 10));
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 0));
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(mockRaf.raf);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should set state equal to endTime minus now", () => {
    const renderProp = jest.fn();
    const rendered = shallow(
      <Timer endTime={endTime.getTime()} render={renderProp} onEnd={() => {}} />
    );
    expect(rendered.state().days).toEqual("00");
    expect(rendered.state().hours).toEqual("00");
    expect(rendered.state().minutes).toEqual("00");
    expect(rendered.state().seconds).toEqual("10");
  });

  test("should update timer every second", () => {
    const renderProp = jest.fn();
    const rendered = shallow(
      <Timer endTime={endTime.getTime()} render={renderProp} onEnd={() => {}} />
    );
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 5));
    mockRaf.step({ time: 1000, count: 1 });

    expect(rendered.state().days).toEqual("00");
    expect(rendered.state().hours).toEqual("00");
    expect(rendered.state().minutes).toEqual("00");
    expect(rendered.state().seconds).toEqual("05");
  });

  test("should render a timer", () => {
    const renderProp = jest.fn(state => <div>{state.seconds}</div>);
    const rendered = shallow(
      <Timer endTime={endTime.getTime()} render={renderProp} onEnd={() => {}} />
    );
    expect(rendered.text()).toEqual("10");
    expect(renderProp).toHaveBeenCalledTimes(1);
  });

  test("should call onEnd prop when timer reaches zero", () => {
    const renderProp = jest.fn();
    const onEndProp = jest.fn();
    const rendered = shallow(
      <Timer
        endTime={endTime.getTime()}
        render={renderProp}
        onEnd={onEndProp}
      />
    );
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 10));
    mockRaf.step({ time: 1000, count: 1 });

    expect(rendered.state().hasEnded).toEqual(true);
    expect(onEndProp).toHaveBeenCalledTimes(1);
  });
});
