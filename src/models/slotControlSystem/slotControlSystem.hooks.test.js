// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useSessions, ACTION_TYPES } from "Models/slotControlSystem";

describe("useSessions", () => {
  const lastUpdateTime = Date.now();
  const activeSession = {
    id: "123-234-345",
    lastUpdateTime,
  };
  const endTime = Date.now() - 10000;
  const endedSession = {
    id: "234-456-789",
    endTime,
  };

  const state = {
    fetch: {
      [ACTION_TYPES.FETCH_SESSION_INIT]: {
        isFetching: false,
      },
    },
    slotControlSystem: {
      activeSession,
      endedSession,
    },
  };

  test("returns object with activeSession, isFetching and endedSession keys", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useSessions} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession,
      isFetching: false,
      endedSession,
    });
  });
});
