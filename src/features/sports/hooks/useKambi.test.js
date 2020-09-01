// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useKambi } from "./useKambi";

const getState = (market, iso4217CurrencyCode) => ({
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            market,
            wallet: { balance: { iso4217CurrencyCode } },
          },
        },
      },
    },
  },
});

describe("useKambi", () => {
  describe("happy path for `en-gb`", () => {
    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      const wrapper = mount(
        <MockStore state={getState("gb_en", "GBP")}>
          <HookWrapper hook={useKambi} args={[]} />
        </MockStore>
      );

      expectHook(wrapper).toEqual({
        kambiMarket: "GB",
        locale: "en_GB",
        market: "gb_en",
        currency: "GBP",
      });
    });
  });

  describe("happy path for `sv`", () => {
    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      const wrapper = mount(
        <MockStore state={getState("se_sv", "SEK")}>
          <HookWrapper hook={useKambi} args={[]} />
        </MockStore>
      );
      expectHook(wrapper).toEqual({
        kambiMarket: "SE",
        locale: "sv_SE",
        market: "se_sv",
        currency: "SEK",
      });
    });
  });

  describe("default path", () => {
    test("returns kambiMarket, locale and market based on urlPrefix", () => {
      const wrapper = mount(
        <MockStore state={getState("___en")}>
          <HookWrapper hook={useKambi} args={[]} />
        </MockStore>
      );
      expectHook(wrapper).toEqual({
        market: "___en",
        kambiMarket: "GB",
        locale: "en_GB",
        currency: "EUR",
      });
    });
  });
});
