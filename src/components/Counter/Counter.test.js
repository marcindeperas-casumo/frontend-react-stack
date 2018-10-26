import React from "react";
import { shallow } from "enzyme";
import Counter, { REFRESH_RATE } from "./Counter";

jest.useFakeTimers();

describe("Counter", () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should update state.value", () => {
    const renderProp = jest.fn();
    const rendered = shallow(
      <Counter start={0} end={100} render={renderProp} />
    );
    expect(rendered.state("value")).toEqual("0");
    jest.advanceTimersByTime(REFRESH_RATE);
    expect(rendered.state("value")).toEqual("1");
  });

  test("should respect decimals", () => {
    const renderProp = jest.fn();
    const rendered = shallow(
      <Counter start={0} end={100} decimals={2} render={renderProp} />
    );
    expect(rendered.state("value")).toEqual("0.00");
  });

  test("should call renderProp", () => {
    const renderProp = jest.fn();
    expect(renderProp).toHaveBeenCalledTimes(0);
    shallow(<Counter start={0} end={100} render={renderProp} />);
    expect(renderProp).toHaveBeenCalledTimes(1);
  });

  test("should call countUp by REFRESH_RATE", () => {
    const spy = jest.spyOn(Counter.prototype, "countUp");
    const renderProp = jest.fn();
    shallow(<Counter start={0} end={100} render={renderProp} />);
    expect(spy).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(REFRESH_RATE);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should call clearTimer when duration is reached", () => {
    const spy = jest.spyOn(Counter.prototype, "clearTimer");
    const renderProp = jest.fn();
    // duration as a small value to prevent runAllTimers from causing a bottleneck.
    shallow(<Counter start={0} end={100} duration={3} render={renderProp} />);
    expect(spy).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should work with other easing functions", () => {
    const easeInQuad = (elapsed, initialValue, amountOfChange, duration) =>
      amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    const renderProp = jest.fn();
    const spy = jest.fn(easeInQuad);

    shallow(<Counter start={0} end={100} easeFn={spy} render={renderProp} />);

    jest.advanceTimersByTime(REFRESH_RATE);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
