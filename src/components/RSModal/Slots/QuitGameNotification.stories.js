// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { QuitGameNotification } from "./QuitGameNotification";
const stories = storiesOf("RSModal/QuitGameNotification", module);

const props = {
  acceptModal: action("acceptModal"),
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

stories.add("Default", () => (
  <MockStore>
    <QuitGameNotification {...props} />
  </MockStore>
));
