// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useActiveSession, ACTION_TYPES } from "Models/slotControlSystem";

describe("useActiveSession", () => {
  const activeSession = {
    id: "123-234-345",
  };
  const updatedAt = Date.now();
  const state = {
    fetch: {
      [ACTION_TYPES.FETCH_SESSION_INIT]: {
        isFetching: false,
      },
    },
    slotControlSystem: {
      activeSession,
      updatedAt,
    },
  };

  test("returns object with activeSession, isFetching and isOld keys", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useActiveSession} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession,
      isFetching: false,
      isOld: updatedAt + 60 * 1000 < Date.now(),
    });
  });
});
