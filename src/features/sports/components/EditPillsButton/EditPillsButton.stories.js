// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import EditPillsButton from "./EditPillsButton";

const stories = storiesOf("Sports/EditPillsButton", module);

stories.add("Default", () => <EditPillsButton onClick={action("onClick")} />);

stories.add("Custom className", () => (
  <EditPillsButton
    onClick={action("onClick")}
    className="t-background-green t-color-white"
  />
));
