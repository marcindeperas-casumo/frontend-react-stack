// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { MARKETS } from "Src/constants";
import { useMarketConfig } from "./useMarketConfig";

const getState = market => ({
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            market,
          },
        },
      },
    },
  },
});

jest.mock("Src/constants", () => {
  const constants = jest.requireActual("../../constants.js");

  return {
    ...constants,
    MARKETS_CONFIG: {
      default: {
        reelRacesHidden: "defaultValue",
      },
      [constants.MARKETS.at_de]: {
        reelRacesHidden: "marketValue",
      },
    },
  };
});

const mockTestProp = "reelRacesHidden";

describe("Hooks/useMarketConfig", () => {
  test("when a setting is defined for a market, it is returned", () => {
    const wrapper = mount(
      <MockStore state={getState(MARKETS.at_de)}>
        <HookWrapper hook={useMarketConfig} args={[mockTestProp]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual("marketValue");
  });

  test("when a setting is undefined for a market, default is returned", () => {
    const wrapper = mount(
      <MockStore state={getState(MARKETS.es_es)}>
        <HookWrapper hook={useMarketConfig} args={[mockTestProp]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual("defaultValue");
  });
});
