// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import activeSessionMock from "Models/slotControlSystem/__mocks__/activeSession.mock";
import { useSessionsState } from "Models/slotControlSystem/useSessionsState";
import { SessionDetailsForLogout } from "Components/Compliance/SlotControlSystem/SessionDetails";
import { BeforeLoggingOut } from "./BeforeLoggingOut";

jest.mock("Models/slotControlSystem/useSessionsState");
jest.mock("Utils/hooks");

describe("RSModal/SlotControlSystem/BeforeLoggingOut", () => {
  const mock = (fn: any) => fn;
  const noActiveSessionState = {
    activeSession: null,
    isSynced: true,
    isFetching: false,
  };
  const stateWithSession = {
    activeSession: activeSessionMock,
    isSynced: true,
    isFetching: false,
  };

  test("it calls acceptModal side effect immediately if there is no active session", () => {
    mock(useSessionsState).mockReturnValue(noActiveSessionState);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(1);
  });

  test("it renders nothing if there is no active session", () => {
    mock(useSessionsState).mockReturnValue(noActiveSessionState);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
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

  test("it does not call side effect if there is an active session", () => {
    mock(useSessionsState).mockReturnValue(stateWithSession);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);
  });

  test("it renders SessionDetails if there is an active session", () => {
    mock(useSessionsState).mockReturnValue(stateWithSession);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.find(SessionDetailsForLogout)).toHaveLength(1);
  });
});
