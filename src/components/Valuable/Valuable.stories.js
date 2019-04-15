// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import Valuable from "./Valuable";

const stories = storiesOf("Valuable", module);
stories.addDecorator(withKnobs);

stories.add(
  "Default",
  () => <Valuable magnitude={"20"} />,
  info({ text: "Default" })
);
