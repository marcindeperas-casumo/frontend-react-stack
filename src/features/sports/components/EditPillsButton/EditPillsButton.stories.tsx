import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import EditPillsButton from "./EditPillsButton";

const stories = storiesOf("Sports/EditPillsButton", module);

stories.add("Without Label", () => (
  <EditPillsButton onClick={action("onClick")} />
));

stories.add("With Label", () => (
  <EditPillsButton onClick={action("onClick")} label="Edit" />
));

stories.add("Custom className", () => (
  <EditPillsButton
    onClick={action("onClick")}
    className="bg-green-30 text-white"
  />
));
