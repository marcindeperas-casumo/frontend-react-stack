// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import {
  useSessionsState,
  ACTION_TYPES,
  type StateType,
} from "Models/slotControlSystem";
import activeSessionMock from "./__mocks__/activeSession.mock";
import endedSessionMock from "./__mocks__/endedSession.mock";
import activeExclusionMock from "./__mocks__/activeExclusion.mock";

describe("useSessionsState", () => {
  const lastUpdateTime = Date.now();
  const activeSession = {
    ...activeSessionMock,
    lastUpdateTime,
  };
  const endTime = Date.now() - 10000;
  const endedSession = {
    ...endedSessionMock,
    endTime,
  };
  const slotControlSystem: StateType = {
    activeSession,
    endedSession,
    activeExclusion: null,
  };
  const fetch = {
    [ACTION_TYPES.FETCH_SESSION_INIT]: {
      isFetching: false,
    },
  };

  test("returns object with activeSession, isFetching, endedSession, endedSessionDuringLastHour and activeExclusion keys", () => {
    const state = {
      fetch,
      slotControlSystem,
    };
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useSessionsState} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession,
      isFetching: false,
      endedSession,
      endedSessionDuringLastHour: true,
      activeExclusion: null,
    });
  });

  test("does not return activeSession if it's older than 1 minute", () => {
    const state = {
      fetch,
      slotControlSystem: {
        ...slotControlSystem,
        activeSession: {
          ...activeSessionMock,
          lastUpdateTime: Date.now() - 7 * 60 * 1000,
        },
      },
    };
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useSessionsState} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession: null,
      isFetching: true,
      endedSession,
      endedSessionDuringLastHour: true,
      activeExclusion: null,
    });
  });

  test("returns endedSessionDuringLastHour = false if there is no prev session", () => {
    const state = {
      fetch,
      slotControlSystem: {
        ...slotControlSystem,
        endedSession: null,
      },
    };
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useSessionsState} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession,
      isFetching: false,
      endedSession: null,
      endedSessionDuringLastHour: false,
      activeExclusion: null,
    });
  });

  test("returns activeExclusion if there is one", () => {
    const state = {
      fetch,
      slotControlSystem: {
        ...slotControlSystem,
        activeExclusion: activeExclusionMock,
      },
    };
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useSessionsState} args={[]} />
      </MockStore>
    );

    expectHook(wrapper).toEqual({
      activeSession,
      isFetching: false,
      endedSession,
      endedSessionDuringLastHour: true,
      activeExclusion: activeExclusionMock,
    });
  });
});
