import { storiesOf } from "@storybook/react";
import React from "react";
import { SettingsHeadline } from "./SettingsHeadline";

const stories = storiesOf("Settings/SettingsHeadline", module);

stories.add("Default", () => (
  <SettingsHeadline
    title="Account Details"
    description="Manage your personal and login info"
  />
));
