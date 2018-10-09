import React from "react";
import { storiesOf } from "@storybook/react";

import info from "../../../.storybook/storybookInfo";

import Clock from "./";

const stories = storiesOf("Clock", module);

stories.add(
  "Default",
  () => (
    <Clock />
  ),
  info({ text: "Default" })
);