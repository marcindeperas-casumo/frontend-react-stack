// @flow
import * as React from "react";
import * as R from "ramda";
import { mount } from "enzyme";
import { HookWrapper } from "Utils/HookWrapper";
import { useCallOnce } from "./useCallOnce";

describe("useCallOnce", () => {
  test("function is never called more than once because of re-renders", () => {
    const thouShallNotCallItInVain = jest.fn();

    const wrapper = mount(
      <HookWrapper hook={useCallOnce} args={[true, thouShallNotCallItInVain]} />
    );

    R.times(() => wrapper.update(), 13);
    expect(thouShallNotCallItInVain).toHaveBeenCalledTimes(1);
    R.times(() => wrapper.update(), 21);
    expect(thouShallNotCallItInVain).toHaveBeenCalledTimes(1);
  });

  test("function is not called until value is truthy", () => {
    const thouShallNotCallItInVain = jest.fn();

    const wrapper = mount(
      <HookWrapper
        hook={useCallOnce}
        args={[false, thouShallNotCallItInVain]}
      />
    );

    R.times(() => wrapper.update(), 13);
    expect(thouShallNotCallItInVain).toHaveBeenCalledTimes(0);
    wrapper.setProps({ args: [true, thouShallNotCallItInVain] });
    expect(thouShallNotCallItInVain).toHaveBeenCalledTimes(1);
  });

  test("function is called only once even if condition flips between truthy/falsy", () => {
    const thouShallNotCallItInVain = jest.fn();

    const wrapper = mount(
      <HookWrapper hook={useCallOnce} args={[true, thouShallNotCallItInVain]} />
    );

    wrapper.setProps({ args: [true, thouShallNotCallItInVain] });
    wrapper.setProps({ args: [false, thouShallNotCallItInVain] });
    wrapper.setProps({ args: [false, thouShallNotCallItInVain] });
    wrapper.setProps({ args: [true, thouShallNotCallItInVain] });

    expect(thouShallNotCallItInVain).toHaveBeenCalledTimes(1);
  });
});
