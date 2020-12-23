// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

const t = {
  tooltip_title: "You’ve been playing for around {{timeLeft}}",
  tooltip_message:
    "To make sure you play okay, we’ll give you a 5 minute break every hour spent playing.",
  remaining_seconds: "{{secondsLeft}} seconds left before you’re given a break",
};

const stories = storiesOf("Compliance/GGL/FiveMinuteBreakDrawerWidget", module);
stories.add("Default", () => {
  return (
    <FiveMinuteBreakDrawerWidget
      timeLeft={Date.now() + 60 * 1000}
      timeElapsed={Date.now()}
      t={t}
    />
  );
});
