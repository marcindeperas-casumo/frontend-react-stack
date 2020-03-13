// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import activeSessionMock from "Models/slotControlSystem/__mocks__/activeSession.mock";
import activeExclusionMock from "Models/slotControlSystem/__mocks__/activeExclusion.mock";
import { NotEnoughFunds } from "Components/Compliance/SlotControlSystem/NotEnoughFunds";
import { StillOnBreak } from "Components/Compliance/SlotControlSystem/StillOnBreak";
import { RememberToPlayWithinLimits } from "Components/Compliance/SlotControlSystem/RememberToPlayWithinLimits";
import { ConfigurationForm } from "Components/Compliance/SlotControlSystem/ConfigurationForm";
import { useSessionsState } from "Models/slotControlSystem/useSessionsState";
import { useWalletAmount } from "Utils/hooks";
import { BeforePlaying } from "./BeforePlaying";

jest.mock("Models/slotControlSystem/useSessionsState");
jest.mock("Utils/hooks/useWalletAmount");

describe("RSModal/SlotControlSystem/BeforePlaying", () => {
  const enoughFunds = 0;
  const mock = (fn: any) => fn;

  test("side effect is triggered with acceptModal fn if there is an activeSession and user has enough funds", () => {
    const sessionsState = {
      activeSession: activeSessionMock,
    };
    const walletAmount = {
      amount: enoughFunds,
      currency: "EUR",
    };
    mock(useSessionsState).mockReturnValue(sessionsState);
    mock(useWalletAmount).mockReturnValue(walletAmount);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    mount(
      <MockStore state={{}}>
        <BeforePlaying
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

  test("it renders NotEnoughFunds and does not call acceptModal if there is no enough funds", () => {
    const sessionsState = {
      activeSession: null,
      isSynced: true,
    };
    const walletAmount = {
      amount: -1,
      currency: "EUR",
    };
    mock(useSessionsState).mockReturnValue(sessionsState);
    mock(useWalletAmount).mockReturnValue(walletAmount);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforePlaying
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);

    expect(rendered.find(NotEnoughFunds)).toHaveLength(1);
  });

  test("it renders StillOnBreak and does not call acceptModal if there is an active exclusion", () => {
    const sessionsState = {
      activeExclusion: activeExclusionMock,
      isSynced: true,
    };
    const walletAmount = {
      amount: enoughFunds,
      currency: "EUR",
    };
    mock(useSessionsState).mockReturnValue(sessionsState);
    mock(useWalletAmount).mockReturnValue(walletAmount);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforePlaying
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);

    expect(rendered.find(StillOnBreak)).toHaveLength(1);
  });

  test("it renders RememberToPlayWithinLimits and does not call acceptModal if there was an active session during last hour", () => {
    const sessionsState = {
      lastEndedSessionDuringLastHour: true,
      isSynced: true,
    };
    const walletAmount = {
      amount: enoughFunds,
      currency: "EUR",
    };
    mock(useSessionsState).mockReturnValue(sessionsState);
    mock(useWalletAmount).mockReturnValue(walletAmount);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforePlaying
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);

    expect(rendered.find(RememberToPlayWithinLimits)).toHaveLength(1);
  });

  test("it renders ConfigurationForm and does not call acceptModal if there is no active session, no active exclusion and last session ended more than an hour ago and user has enough funds", () => {
    const sessionsState = {
      isSynced: true,
    };
    const walletAmount = {
      amount: enoughFunds,
      currency: "EUR",
    };
    mock(useSessionsState).mockReturnValue(sessionsState);
    mock(useWalletAmount).mockReturnValue(walletAmount);

    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforePlaying
          t={null}
          config={{}}
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);

    expect(rendered.find(ConfigurationForm)).toHaveLength(1);
  });
});
