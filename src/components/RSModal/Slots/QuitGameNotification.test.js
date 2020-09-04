import React from "react";
import { mount } from "enzyme";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import MockStore from "Components/MockStore";
import { QuitGameNotification } from "./QuitGameNotification";
import { QuitGameNotificationProps } from "./__mocks__/QuitGameNotificationProps.mock";

describe("Quit Game Notification / Modal", () => {
  test("should render modal with big title, main text, primary button and close icon", () => {
    const rendered = mount(
      <MockStore>
        <QuitGameNotification {...QuitGameNotificationProps} />
      </MockStore>
    );
    const buttonPrimary = rendered.find(ButtonPrimary);
    const modalMainText = rendered.find(Text);
    expect(buttonPrimary.length).toBe(1);
    expect(buttonPrimary.text()).toMatch("Make Deposit");
    expect(rendered.find("svg").length).toBe(1);
    expect(modalMainText.text()).toMatch(/(exit the game)/i);
  });
});
