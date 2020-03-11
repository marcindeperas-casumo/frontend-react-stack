// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { waitAndUpdateWrapper } from "Utils";
import lastEndedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";
import activeExclusionMock from "Models/slotControlSystem/__mocks__/activeExclusion.mock";
import { useSessionsState } from "Models/slotControlSystem/useSessionsState";
import {
  SessionDetailsForLimitsReached,
  SessionDetailsForLimitsReachedExcluded,
} from "Components/Compliance/SlotControlSystem/SessionDetails";
import { AfterLimitsReached } from "./AfterLimitsReached";
import {
  queryMocks,
  deadOrAlive2,
  gonzosQuest,
} from "./__mocks__/afterLimitsReached.mocks";

jest.mock("Models/slotControlSystem/useSessionsState");

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

  const { location } = window;

  beforeEach(() => {
    // eslint-disable-next-line fp/no-delete
    delete window.location;

    window.location = {
      pathname: "/games/top",
      hostname: "casumotest.com",
    };
  });

  afterEach(() => {
    window.location = location;
  });

  test("it renders nothing if there is no last ended session", async () => {
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

    await waitAndUpdateWrapper(rendered);

    expect(rendered.isEmptyRender()).toEqual(true);
  });

  test("it renders SessionDetailsForLimitsReached if there is last ended session and no active exclusion; also Session Details are injected with latest played game.", async () => {
    mock(useSessionsState).mockReturnValue(stateWithLastEndedSession);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}} queryMocks={queryMocks}>
        <AfterLimitsReached
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    await waitAndUpdateWrapper(rendered);

    const foundWrapper = rendered.find(SessionDetailsForLimitsReached);

    expect(foundWrapper).toHaveLength(1);

    expect(foundWrapper.prop("playAgainGame")).toEqual(deadOrAlive2);
  });

  test("it renders SessionDetailsForLimitsReached if there is last ended session and no active exclusion. If we're on game page Session Details are injected with the current game.", async () => {
    mock(useSessionsState).mockReturnValue(stateWithLastEndedSession);

    window.location.pathname = "/play/gonzos-quest/launch";

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}} queryMocks={queryMocks}>
        <AfterLimitsReached
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    await waitAndUpdateWrapper(rendered);

    const foundWrapper = rendered.find(SessionDetailsForLimitsReached);

    expect(foundWrapper).toHaveLength(1);

    expect(foundWrapper.prop("playAgainGame")).toEqual(gonzosQuest);
  });

  test("it renders SessionDetailsForLimitsReachedExcluded if there is last ended session and active exclusion", async () => {
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

    await waitAndUpdateWrapper(rendered);

    expect(rendered.find(SessionDetailsForLimitsReachedExcluded)).toHaveLength(
      1
    );
  });
});
