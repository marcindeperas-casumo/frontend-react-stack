// @flow
import React from "react";
import { mount } from "enzyme";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useTimeoutFn } from "./useTimeoutFn";

jest.useFakeTimers();

describe("useTimeoutFn", () => {
  const RealDateNow = Date.now;

  const mockDate = ts => {
    global.Date.now = () => ts;
  };
  beforeEach(() => {
    mockDate(100);
  });
  afterEach(() => {
    global.Date.now = RealDateNow;
  });
  test("initial data from hook", () => {
    const wrapper = mount(<HookWrapper hook={useTimeoutFn} args={[]} />);

    expectHook(wrapper).not.toBeNull();
  });
  test("scheduleIn execute timeout fn", () => {
    const wrapper = mount(<HookWrapper hook={useTimeoutFn} args={[]} />);
    const fn = jest.fn();
    const hook = wrapper.find("div").props().hook;

    hook.scheduleIn(fn, 100);

    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(99);
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toBeCalled();
  });
  test("scheduleIn cancel timeout", () => {
    const wrapper = mount(<HookWrapper hook={useTimeoutFn} args={[]} />);
    const fn = jest.fn();
    const hook = wrapper.find("div").props().hook;

    hook.scheduleIn(fn, 100);

    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(99);
    expect(fn).not.toBeCalled();

    hook.clear();

    jest.advanceTimersByTime(1);
    expect(fn).not.toBeCalled();
  });
  test("scheduleAt execute timeout fn", () => {
    const wrapper = mount(<HookWrapper hook={useTimeoutFn} args={[]} />);
    const fn = jest.fn();
    const hook = wrapper.find("div").props().hook;

    hook.scheduleAt(fn, Date.now() + 100);

    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(99);
    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toBeCalled();
  });
  test("scheduleIn cancel timeout", () => {
    const wrapper = mount(<HookWrapper hook={useTimeoutFn} args={[]} />);
    const fn = jest.fn();
    const hook = wrapper.find("div").props().hook;

    hook.scheduleAt(fn, Date.now() + 100);

    expect(fn).not.toBeCalled();
    jest.advanceTimersByTime(99);
    expect(fn).not.toBeCalled();

    hook.clear();

    jest.advanceTimersByTime(1);
    expect(fn).not.toBeCalled();
  });
});
