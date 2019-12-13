// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import lastEndedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";
import activeExclusionMock from "Models/slotControlSystem/__mocks__/activeExclusion.mock";
import { useSessionsState } from "Models/slotControlSystem/useSessionsState";
import {
  SessionDetailsForLimitsReached,
  SessionDetailsForLimitsReachedExcluded,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
import { AfterLimitsReached } from "./AfterLimitsReached";

jest.mock("Models/slotControlSystem/useSessionsState");
jest.mock("Utils/hooks");

describe("RSModal/SlotControlSystem/AfterLimitsReached", () => {
  const mock = (fn: any) => fn;
  const noLastEndedSessionState = {
    lastEndedSession: null,
    isFresh: true,
    isFetching: false,
  };
  const stateWithLastEndedSession = {
    lastEndedSession: lastEndedSessionMock,
    isFresh: true,
    isFetching: false,
  };
  const stateWithLastEndedSessionAndExclusion = {
    lastEndedSession: lastEndedSessionMock,
    activeExclusion: activeExclusionMock,
    isFresh: true,
    isFetching: false,
  };

  test("it renders nothing if there is no last ended session", () => {
    mock(useSessionsState).mockReturnValue(noLastEndedSessionState);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <AfterLimitsReached
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.isEmptyRender()).toEqual(true);
  });

  test("it renders SessionDetailsForLimitsReached if there is last ended session and no active exclusion", () => {
    mock(useSessionsState).mockReturnValue(stateWithLastEndedSession);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <AfterLimitsReached
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.find(SessionDetailsForLimitsReached)).toHaveLength(1);
  });

  test("it renders SessionDetailsForLimitsReachedExcluded if there is last ended session and active exclusion", () => {
    mock(useSessionsState).mockReturnValue(
      stateWithLastEndedSessionAndExclusion
    );

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <AfterLimitsReached
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.find(SessionDetailsForLimitsReachedExcluded)).toHaveLength(
      1
    );
  });
});
