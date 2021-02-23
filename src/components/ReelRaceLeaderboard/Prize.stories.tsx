// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { Prize } from "./Prize";

const stories = storiesOf("ReelRaceLeaderboard/Prize", module);

stories.add("Default", () => {
  return (
    <div>
      <br />
      <br />
      <div className="u-text-align-right">
        <Prize prize="$1" highlighted />
        <br />
        <br />
        <Prize prize="$50" highlighted />
        <br />
        <br />
        <Prize prize="$500" highlighted />
        <br />
        <br />
        <Prize prize="$5" />
        <br />
        <br />
        <Prize prize="$50" />
        <br />
        <br />
        <Prize prize="$500" />
      </div>
      <div>
        <Prize prize="$1" highlighted />
        <br />
        <br />
        <Prize prize="$50" highlighted />
        <br />
        <br />
        <Prize prize="$500" highlighted />
        <br />
        <br />
        <Prize prize="$5" />
        <br />
        <br />
        <Prize prize="$50" />
        <br />
        <br />
        <Prize prize="$500" />
      </div>
    </div>
  );
});
