// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useJurisdiction } from "./useJurisdiction";

const getState = jurisdiction => ({
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            jurisdiction,
          },
        },
      },
    },
  },
});

describe("useJurisdiction", () => {
  test("returns an object with jurisdiction prop equal to player's and isMGA flag set to true", () => {
    const jurisdiction = "MGA";

    const wrapper = mount(
      <MockStore state={getState(jurisdiction)}>
        <HookWrapper hook={useJurisdiction} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      isDGA: false,
      isDGOJ: false,
      isMGA: true,
      isSGA: false,
      isUKGC: false,
      isGGL: false,
      jurisdiction,
    });
  });

  test("returns the correct jurisdiction info it is DGOJ", () => {
    const jurisdiction = "DGOJ";

    const wrapper = mount(
      <MockStore state={getState(jurisdiction)}>
        <HookWrapper hook={useJurisdiction} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      isDGA: false,
      isDGOJ: true,
      isMGA: false,
      isSGA: false,
      isUKGC: false,
      isGGL: false,
      jurisdiction,
    });
  });
});
