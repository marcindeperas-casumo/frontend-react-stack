import React from "react";
import { mount } from "enzyme";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import MockStore from "Components/MockStore";
import { QuitGameNotification } from "./QuitGameNotification";

describe("Quit Game Notification / Modal", () => {
  const props = {
    acceptModal: () => null,
    t: {
      quit_game_modal_title: "Quit Game",
      quit_game_modal_text:
        "To make a deposit you'll need to exit the game. If you deposit using a debit or credit card, you won't have to exit the game everytime you want to make a deposit.",
      quit_game_cta_text: "Make Deposit",
    },
    config: {
      onCloseCallBack: () => null,
    },
  };

  test("should render modal with big title, main text, primary button and close icon", () => {
    const rendered = mount(
      <MockStore>
        <QuitGameNotification {...props} />
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
