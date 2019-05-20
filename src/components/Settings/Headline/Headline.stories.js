// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Headline from "./";

const stories = storiesOf("Settings/Headline", module);

stories.add("Default", () => (
  <Headline
    title="Account Details"
    description="Manage your personal and login info"
  />
));
