// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { CurrentSessionTimer } from "./CurrentSessionTimer";

const currentTime = Date.now();

const stories = storiesOf("CurrentSessionTimer", module);

if (isNotChromatic) {
  stories.add("Default", () => (
    <CurrentSessionTimer
      startTime={currentTime}
      render={state => `${state.hours}:${state.minutes}:${state.seconds}`}
    />
  ));
}
