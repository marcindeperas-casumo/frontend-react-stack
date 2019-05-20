// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import LabelAndValue from "./";

const stories = storiesOf("Settings/LabelAndValue", module);

stories.add("Default", () => (
  <LabelAndValue
    label="Address"
    value={
      <div>
        <div>Line 1</div>
        <div>Line 2</div>
      </div>
    }
  />
));
