import React from "react";
import { shallow } from "enzyme";
import Counter from "./Counter";

jest.useFakeTimers();

describe("Counter", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should call renderProp", () => {
    const renderProp = jest.fn(state => <div>{state.value}</div>);
    const rendered = shallow(
      <Counter start={0} end={100} render={renderProp} />
    );
    expect(rendered.text()).toEqual("0");
    expect(renderProp).toHaveBeenCalledTimes(1);
  });

  test("should call countUp 30 times every second", () => {
    const spy = jest.spyOn(Counter.prototype, "countUp");
    const renderProp = jest.fn();
    shallow(<Counter start={0} end={100} render={renderProp} />);
    jest.advanceTimersByTime(1001);
    expect(spy).toHaveBeenCalledTimes(30);
  });

  test("should call clearTimer when duration is reached", () => {
    const spy = jest.spyOn(Counter.prototype, "clearTimer");
    const renderProp = jest.fn();
    const duration = 1000;
    shallow(
      <Counter start={0} end={100} duration={duration} render={renderProp} />
    );

    jest.advanceTimersByTime(duration);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("should work with other easing functions", () => {
    const easeInQuad = (elapsed, initialValue, amountOfChange, duration) =>
      amountOfChange * (elapsed /= duration) * elapsed + initialValue;
    const renderProp = jest.fn();
    const spy = jest.fn(easeInQuad);

    shallow(<Counter start={0} end={100} easeFn={spy} render={renderProp} />);

    jest.advanceTimersByTime(1001);
    expect(spy).toHaveBeenCalledTimes(30);
  });
});
