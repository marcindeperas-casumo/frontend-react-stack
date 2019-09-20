// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SlotControlSystem } from "./SlotControlSystem";

const stories = storiesOf("RSModal/SlotControlSystem", module);

stories.add("Default", () => (
  <SlotControlSystem hideModalSuccess={action("hideModalSuccess")} />
));
