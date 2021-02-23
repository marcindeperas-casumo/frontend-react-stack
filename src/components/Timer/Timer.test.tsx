import React from "react";
import { shallow } from "enzyme";
import { Settings } from "luxon";
import Timer from "./Timer";
const createMockRaf = require("mock-raf");
const mockRaf = createMockRaf();

describe("Timer", () => {
  let endTime, startTime;

  beforeEach(() => {
    endTime = new Date(Date.UTC(2018, 1, 1, 1, 1, 10));
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Date' is not assignable to type 'number'.
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 0));
    jest.spyOn(window, "requestAnimationFrame").mockImplementation(mockRaf.raf);
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
    const spy = jest.spyOn(Timer.prototype, "updateTime");
    const rendered = shallow(
      <Timer endTime={endTime.getTime()} render={renderProp} onEnd={() => {}} />
    );
    expect(spy).toHaveBeenCalledTimes(0);

    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Date' is not assignable to type 'number'.
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 5));
    mockRaf.step({ time: 1000, count: 1 });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(rendered.state().days).toEqual("00");
    expect(rendered.state().hours).toEqual("00");
    expect(rendered.state().minutes).toEqual("00");
    expect(rendered.state().seconds).toEqual("05");

    mockRaf.step({ time: 1000, count: 1 });
    expect(spy).toHaveBeenCalledTimes(2);

    mockRaf.step({ time: 1000, count: 1 });
    expect(spy).toHaveBeenCalledTimes(3);
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
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Date' is not assignable to type 'number'.
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 1, 10));
    mockRaf.step({ time: 1000, count: 1 });

    expect(rendered.state().hasEnded).toEqual(true);
    expect(onEndProp).toHaveBeenCalledTimes(1);
  });

  test("should count upwards when startTime is defined", () => {
    const renderProp = jest.fn();
    startTime = new Date(Date.UTC(2018, 1, 1, 1, 1, 0));
    Settings.now = () => new Date(Date.UTC(2018, 1, 1, 1, 2, 10)).getTime();
    const rendered = shallow(
      <Timer startTime={startTime.getTime()} render={renderProp} />
    );
    mockRaf.step({ time: 1000, count: 1 });
    expect(rendered.state().days).toEqual("00");
    expect(rendered.state().hours).toEqual("00");
    expect(rendered.state().minutes).toEqual("01");
    expect(rendered.state().seconds).toEqual("10");
  });
});
