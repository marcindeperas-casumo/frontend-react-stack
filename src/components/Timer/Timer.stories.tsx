// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import Timer from "./";

const tenSecondsFromNow = Date.now() + 10 * 1000;

const stories = storiesOf("Timer", module);
if (isNotChromatic) {
  stories.add("Default", () => (
    <Timer
      endTime={tenSecondsFromNow}
      render={state => (
        <div
          style={{
            fontFamily: "monospace",
          }}
        >
          {state.hours}
          <span style={{ margin: "0 4px" }}>:</span>
          {state.minutes}
          <span style={{ margin: "0 4px" }}>:</span>
          {state.seconds}
        </div>
      )}
      onEnd={state => <div>Times up!</div>}
    />
  ));
}
