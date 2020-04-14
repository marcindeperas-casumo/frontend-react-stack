// @flow
import * as React from "react";
import { mount } from "enzyme";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useKambiMarketFromUrlPrefix } from "./useKambiMarketFromUrlPrefix";

describe("useUrlPrefixMarket", () => {
  describe("happy path for `en-gb`", () => {
    const urlPrefix = "en-gb";
    const wrapper = mount(
      <HookWrapper hook={useKambiMarketFromUrlPrefix} args={[urlPrefix]} />
    );

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expectHook(wrapper).toEqual({
        kambiMarket: "GB",
        locale: "en_GB",
        market: "gb_en",
      });
    });
  });

  describe("happy path for `no`", () => {
    const urlPrefix = "no";
    const wrapper = mount(
      <HookWrapper hook={useKambiMarketFromUrlPrefix} args={[urlPrefix]} />
    );

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expectHook(wrapper).toEqual({
        kambiMarket: "NO",
        locale: "no_NO",
        market: "no_no",
      });
    });
  });

  describe("default path", () => {
    const urlPrefix = "lol";
    const wrapper = mount(
      <HookWrapper hook={useKambiMarketFromUrlPrefix} args={[urlPrefix]} />
    );

    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      expectHook(wrapper).toEqual({
        market: "___en",
        kambiMarket: "GB",
        locale: "en_GB",
      });
    });
  });
});
