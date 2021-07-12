import React from "react";
import { mount } from "enzyme";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useScreenOrientation } from "./useScreenOrientation";

describe("useScreenOrientation", () => {
  describe("equals landscape", () => {
    beforeEach(() => {
      window.matchMedia = query =>
        ({
          matches: query.includes("landscape"),
        } as any);
    });

    test("Initial data from hook to equal landscape", () => {
      const wrapper = mount(
        <HookWrapper hook={useScreenOrientation} args={[]} />
      );
      const hook = wrapper.find("div").props().hook;
      expectHook(wrapper).not.toBeNull();

      expect(hook.isLandscapeOriented()).toEqual(true);
      expect(hook.isPortraitOriented()).toEqual(false);
      expect(hook.orientation).toEqual("landscape");
    });
  });

  describe("equals portrait", () => {
    beforeEach(() => {
      window.matchMedia = query =>
        ({
          matches: query.includes("portrait"),
        } as any);
    });

    test("Initial data from hook to equal portrait", () => {
      const wrapper = mount(
        <HookWrapper hook={useScreenOrientation} args={[]} />
      );
      const hook = wrapper.find("div").props().hook;
      expectHook(wrapper).not.toBeNull();

      expect(hook.isLandscapeOriented()).toEqual(false);
      expect(hook.isPortraitOriented()).toEqual(true);
      expect(hook.orientation).toEqual("portrait");
    });
  });
});
