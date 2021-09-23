import React from "react";
import { mount } from "enzyme";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import MockStore from "Components/MockStore";
import { MARKETS, ROUTE_IDS } from "Src/constants";
import { useTranslatedUrl } from "./useTranslatedUrl";

const getState = market => ({
  handshake: {
    app: {
      "common/composition/players": {
        players: {
          "2bb42ab0-7937-11e8-b6b5-0242ac11000b": {
            market: market,
          },
        },
      },
    },
  },
});

const locationBackup = window.location;

describe("useTranslatedUrl", () => {
  beforeEach(() => {
    // eslint-disable-next-line fp/no-delete
    delete window.location;
    window.location = {
      ...locationBackup,
      hostname: "casumo.com",
    };
  });
  afterEach(() => {
    window.location = locationBackup;
  });

  test("should return proper url for default EN_GB market", () => {
    const wrapper = mount(
      <MockStore state={{}}>
        <HookWrapper
          hook={useTranslatedUrl}
          args={[ROUTE_IDS.GAME_DETAILS, { slug: "my-game-slug" }]}
        />
      </MockStore>
    );

    const hook = wrapper.find("div").props()["hook"];

    expect(hook).toBe("en-gb/play/my-game-slug");
  });

  test("should return proper url for IN market", () => {
    const wrapper = mount(
      <MockStore state={getState(MARKETS.in_en)}>
        <HookWrapper
          hook={useTranslatedUrl}
          args={[ROUTE_IDS.GAME_DETAILS, { slug: "my-game-slug" }]}
        />
      </MockStore>
    );

    expectHook(wrapper).toBe("en-in/play/my-game-slug");
  });

  test("should translated url for TLD-specific market (ES)", () => {
    window.location.hostname = "casumo.es";

    const wrapper = mount(
      <MockStore state={getState(MARKETS.es_es)}>
        <HookWrapper
          hook={useTranslatedUrl}
          args={[ROUTE_IDS.GAME_DETAILS, { slug: "my-game-slug" }]}
        />
      </MockStore>
    );

    expectHook(wrapper).toBe("jugar/my-game-slug");
  });

  test("should translated url for TLD-specific market (DE)", () => {
    window.location.hostname = "casumo.de";

    const wrapper = mount(
      <MockStore state={getState(MARKETS.de_de)}>
        <HookWrapper
          hook={useTranslatedUrl}
          args={[ROUTE_IDS.GAME_DETAILS, { slug: "my-game-slug" }]}
        />
      </MockStore>
    );

    expectHook(wrapper).toBe("spielen/my-game-slug");
  });
});
