// @flow
/* eslint-disable fp/no-let, fp/no-mutation */
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "../../../.storybook/storybookInfo";
import isNotChromatic from "../../../.storybook/isNotChromatic";
import Timer from "./";

let tenSecondsFromNow = new Date();
tenSecondsFromNow.setSeconds(tenSecondsFromNow.getSeconds() + 10);
tenSecondsFromNow = tenSecondsFromNow.getTime();

const stories = storiesOf("Timer", module);
if (isNotChromatic) {
  stories.add(
    "Default",
    () => (
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
    ),
    info({ text: "Default" })
  );
}
