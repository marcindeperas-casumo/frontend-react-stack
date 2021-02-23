// @flow
import { act } from "react-dom/test-utils";
import * as React from "react";
import { mount } from "enzyme";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useDelayedCleanup } from "./useDelayedCleanup";

jest.useFakeTimers();

describe("useDelayedCleanup", () => {
  describe("happy path", () => {
    const wrapper = mount(
      <HookWrapper hook={useDelayedCleanup} args={["first", 1000]} />
    );

    test("sets initial value instantly", () => {
      expectHook(wrapper).toEqual("first");
    });

    test("changes to different value instantly", () => {
      wrapper.setProps({ args: ["second", 1000] });
      wrapper.update();
      expectHook(wrapper).toEqual("second");
    });

    test("waits given time before setting value to null", () => {
      wrapper.setProps({ args: [null, 1000] });
      wrapper.update();
      expectHook(wrapper).toEqual("second");
      act(jest.runAllTimers);
      expectHook(wrapper).toEqual("second");
    });
  });

  test("doesn't change value to null if another update happened during timeout", () => {
    const wrapper = mount(
      <HookWrapper hook={useDelayedCleanup} args={["first", 1000]} />
    );

    wrapper.setProps({ args: [null, 1000] });
    wrapper.update();
    wrapper.setProps({ args: ["second", 1000] });
    wrapper.update();
    expectHook(wrapper).toEqual("second");
    act(jest.runAllTimers);
    expectHook(wrapper).toEqual("second");
  });
});
