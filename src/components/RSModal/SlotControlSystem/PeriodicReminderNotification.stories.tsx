// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { PeriodicReminderNotification } from "./PeriodicReminderNotification";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T00:00:00").toString());
}

const stories = storiesOf("RSModal/SlotControlSystem", module);

const props = {
  acceptModal: action("acceptModal"),
  closeModal: action("closeModal"),
  dismissModal: action("dismissModal"),
  config: {},
  t: {
    time_played: "Time played:",
    session_loss_limit: "Session loss limit:",
    remaining_session_loss_limit: "Remaining session loss limit:",
    money_wagered: "Money wagered:",
    money_won: "Money won:",
    modal_title: "Session update",
    continue_playing_button: "Continue playing",
  },
};

stories.add("PeriodicReminderNotification", () => (
  <PeriodicReminderNotification {...props} />
));
