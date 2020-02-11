// @flow
import * as React from "react";
import { mount } from "enzyme";
import { getGameCategories } from "Api/api.casinoPlayerGames";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { waitAndUpdateWrapper } from "Utils";
import { useGameCategories } from "./useGameCategories";

jest.mock("Lib/cometd"); // For some reason, this file executes and breaks tests here 🐛

const gameCategories = ["SLOT_MACHINE"];

jest.mock("Api/api.casinoPlayerGames", () => ({
  getGameCategories: jest.fn(),
}));

// $FlowIgnore
getGameCategories.mockReturnValue(Promise.resolve(gameCategories));

const slug = "tiger-rush";
const state = {
  slotControlSystem: {
    slugToCategoryMap: {
      [slug]: gameCategories,
    },
  },
};

describe("useGameCategories", () => {
  beforeEach(() => {
    // $FlowIgnore
    getGameCategories.mockClear();
  });

  describe("no data in store", () => {
    test("fetch data if nothing is saved in store", async () => {
      const wrapper = mount(
        <MockStore state={{}}>
          <HookWrapper hook={useGameCategories} args={[slug]} />
        </MockStore>
      );
      await waitAndUpdateWrapper(wrapper);

      expectHook(wrapper).toEqual({
        loading: false,
        gameCategories,
      });
    });

    test("request will be sent only once", async () => {
      const wrapper = mount(
        <MockStore state={{}}>
          <HookWrapper hook={useGameCategories} args={[slug]} />
        </MockStore>
      );

      // eslint-disable-next-line fp/no-loops
      for (let i = 0; i < 13; i++) {
        await waitAndUpdateWrapper(wrapper);
      }

      expect(getGameCategories).toHaveBeenCalledTimes(1);
    });
  });

  describe("data in store", () => {
    test("get data from store", () => {
      const wrapper = mount(
        <MockStore state={state}>
          <HookWrapper hook={useGameCategories} args={[slug]} />
        </MockStore>
      );

      expectHook(wrapper).toEqual({
        loading: false,
        gameCategories,
      });
    });

    test("request will be sent 0 times", async () => {
      const wrapper = mount(
        <MockStore state={state}>
          <HookWrapper hook={useGameCategories} args={[slug]} />
        </MockStore>
      );

      // eslint-disable-next-line fp/no-loops
      for (let i = 0; i < 13; i++) {
        await waitAndUpdateWrapper(wrapper);
      }

      expect(getGameCategories).toHaveBeenCalledTimes(0);
    });
  });
});
