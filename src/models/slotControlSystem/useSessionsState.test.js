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
  const now = 1575462653148;
  const lastUpdateTime = now;
  const activeSession = {
    ...activeSessionMock,
  };
  const endTime = now - 10000;
  const lastEndedSession = {
    ...endedSessionMock,
    endTime,
  };
  const slotControlSystem: StateType = {
    slugToCategoryMap: {},
    lastUpdateTime,
    activeSession,
    lastEndedSession,
    activeExclusion: null,
  };
  const fetch = {
    [ACTION_TYPES.FETCH_SESSION_INIT]: {
      isFetching: false,
    },
  };
  let nowSpy;

  beforeEach(() => {
    nowSpy = jest.spyOn(Date, "now").mockImplementation(() => now);
  });
  afterEach(() => {
    nowSpy.mockClear();
  });

  test("returns object with activeSession, isFetching, isFresh, endedSession, endedSessionDuringLastHour and activeExclusion keys", () => {
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
      isFresh: true,
      lastEndedSession,
      lastEndedSessionDuringLastHour: true,
      activeExclusion: null,
    });
  });

  test("returns endedSessionDuringLastHour = false if there is no prev session", () => {
    const state = {
      fetch,
      slotControlSystem: {
        ...slotControlSystem,
        lastEndedSession: null,
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
      isFresh: true,
      lastEndedSession: null,
      lastEndedSessionDuringLastHour: false,
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
      isFresh: true,
      lastEndedSession,
      lastEndedSessionDuringLastHour: true,
      activeExclusion: activeExclusionMock,
    });
  });
});
