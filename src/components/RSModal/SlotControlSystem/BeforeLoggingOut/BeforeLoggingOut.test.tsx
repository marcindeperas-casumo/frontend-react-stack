import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import {
  basicSummary,
  summaryWithSlotSession,
} from "Models/loginSession/__mocks__/summaryMocks";
import { SessionDetailsForLogout } from "Components/Compliance/SlotControlSystem/SessionDetails";
import { BeforeLoggingOut } from "./BeforeLoggingOut";

describe("RSModal/SlotControlSystem/BeforeLoggingOut", () => {
  test("it calls acceptModal side effect immediately if there is no active slot session and not in DGOJ", () => {
    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();

    mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          summary={basicSummary}
          locale="es-ES"
          jurisdiction="MGA"
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(1);
  });

  test("it renders nothing if not in DGOJ", () => {
    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          summary={basicSummary}
          locale="es-ES"
          jurisdiction="MGA"
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.isEmptyRender()).toEqual(true);
  });

  test("it does not call side effect if there is an active session", () => {
    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          summary={summaryWithSlotSession}
          locale="es-ES"
          jurisdiction="DGOJ"
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(acceptModal).toHaveBeenCalledTimes(0);
  });

  test("it renders SessionDetails if there is an active session", () => {
    const acceptModal = jest.fn();
    const closeModal = jest.fn();
    const dismissModal = jest.fn();
    const rendered = mount(
      <MockStore state={{}}>
        <BeforeLoggingOut
          t={null}
          summary={summaryWithSlotSession}
          locale="es-ES"
          jurisdiction="DGOJ"
          acceptModal={acceptModal}
          closeModal={closeModal}
          dismissModal={dismissModal}
        />
      </MockStore>
    );

    expect(rendered.find(SessionDetailsForLogout)).toHaveLength(1);
  });
});
