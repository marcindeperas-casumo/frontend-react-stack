// @flow
import * as React from "react";
import { mount } from "enzyme";
import { URL_PREFIXES } from "Src/constants";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useUrlPrefix } from "./useUrlPrefix";

const state = {
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            market: "gb_en",
          },
        },
      },
    },
  },
};

describe("useUrlPrefix", () => {
  test("returns url prefix for .com", () => {
    delete global.window.location; // eslint-disable-line fp/no-delete
    global.window = Object.create(window);
    global.window.location = {
      hostname: "https://casumo.com",
    };

    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useUrlPrefix} args={[]} />
      </MockStore>
    );
    expectHook(wrapper).toEqual(URL_PREFIXES.gb_en);
  });

  test("returns url prefix for .dev", () => {
    delete global.window.location; // eslint-disable-line fp/no-delete
    global.window = Object.create(window);
    global.window.location = {
      hostname: "https://casumo.dev",
    };

    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useUrlPrefix} args={[]} />
      </MockStore>
    );
    expectHook(wrapper).toEqual(URL_PREFIXES.gb_en);
  });

  test("doesn't returns url prefix for market specific domain", () => {
    delete global.window.location; // eslint-disable-line fp/no-delete
    global.window = Object.create(window);
    global.window.location = {
      hostname: "https://casumo.es",
    };

    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useUrlPrefix} args={[]} />
      </MockStore>
    );
    expectHook(wrapper).toEqual(null);
  });
});
