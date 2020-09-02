// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { useSetScrollPosition } from "./gameBrowserHooks";

const state = {
  gameBrowser: {
    scroll: 666,
  },
};

describe("useSetScrollPosition", () => {
  const scrollTo = jest.fn();
  delete global.document.getElementById; // eslint-disable-line fp/no-delete
  global.document.getElementById = () => {
    return {
      scrollTop: 1000,
      scrollTo,
    };
  };

  const wrapper = mount(
    <MockStore state={state}>
      <HookWrapper hook={useSetScrollPosition} args={[]} />
    </MockStore>
  );

  test("scrollTo is called with proper arg", () => {
    expect(scrollTo).toHaveBeenNthCalledWith(1, 0, state.gameBrowser.scroll);
  });

  test("scrollTo is called only once, no matter how many updates will be trigerred", () => {
    wrapper.update();
    wrapper.update();
    expect(scrollTo).toHaveBeenCalledTimes(1);
    wrapper.update();
    wrapper.update();
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});
