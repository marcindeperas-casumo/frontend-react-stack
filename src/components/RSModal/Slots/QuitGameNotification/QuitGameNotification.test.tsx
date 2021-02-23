// @flow
import React from "react";
import { mount } from "enzyme";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import MockStore from "Components/MockStore";
import { QuitGameNotification } from "./QuitGameNotification";
import { cms } from "./__mocks__/cms";

describe("Quit Game Notification / Modal", () => {
  test("should render modal with big title, main text, primary button and close icon", () => {
    const rendered = mount(
      <MockStore>
        <QuitGameNotification t={cms} />
      </MockStore>
    );
    const buttonPrimary = rendered.find(ButtonPrimary);
    const modalMainText = rendered.find(Text);
    expect(rendered.find(ButtonPrimary).length).toBe(1);
    expect(buttonPrimary.text()).toMatch("Make Deposit");
    expect(rendered.find("svg").length).toBe(1);
    expect(modalMainText.text()).toMatch(/(exit the game)/i);
  });
});
