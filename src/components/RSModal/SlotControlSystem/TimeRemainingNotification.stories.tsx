// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TimeRemainingNotification } from "./TimeRemainingNotification";

const stories = storiesOf("RSModal/SlotControlSystem", module);

const props = {
  acceptModal: action("acceptModal"),
  closeModal: action("closeModal"),
  dismissModal: action("dismissModal"),
  config: {},
  t: {
    modal_title: "You will soon reach your limits",
    modal_body:
      "You have only 1 minute until you reach the time limit set for the game session.",
    continue_playing_button: "Continue playing",
  },
};

stories.add("TimeRemainingNotification", () => (
  <TimeRemainingNotification {...props} />
));
