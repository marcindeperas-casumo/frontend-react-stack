// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReelRaceIcon } from "./ReelRaceIcon";

const stories = storiesOf("ReelRaceIcon", module);

stories.add("Default", () => {
  return (
    <div
      className="t-background-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
      style={{
        height: 48,
        boxSizing: "content-box",
      }}
    >
      <div>
        <ReelRaceIcon onClick={action("clicked")} />
      </div>
    </div>
  );
});
