import { storiesOf } from "@storybook/react";
import React from "react";
import { SettingsLabelAndValue } from "./SettingsLabelAndValue";

const stories = storiesOf("Settings/SettingsLabelAndValue", module);

stories.add("Default", () => (
  <SettingsLabelAndValue
    label="Address"
    value={
      <div>
        <div>Line 1</div>
        <div>Line 2</div>
      </div>
    }
  />
));
