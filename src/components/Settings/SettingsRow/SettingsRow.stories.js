// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SettingsRow } from "./SettingsRow";

const stories = storiesOf("Settings/SettingsRow", module);

stories.add("Default", () => (
  <SettingsRow text="a label">
    <a href="http://www.casumo.com">Go to home</a>
  </SettingsRow>
));
