import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import * as React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

if (isChromatic) {
  MockDate.set(new Date("2021-01-01T00:00:00").toString());
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
      timeElapsed={Date.now() - 900 * 1000}
      timeLeft={Date.now() + 2700 * 1000}
      t={t}
    />
  );
});
stories.add("Less than a minute left", () => {
  return (
    <FiveMinuteBreakDrawerWidget
      timeElapsed={Date.now() - 3550 * 1000}
      timeLeft={Date.now() + 51 * 1000}
      t={t}
    />
  );
});
