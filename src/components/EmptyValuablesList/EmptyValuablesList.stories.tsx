import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs/react";
import React from "react";
import { EmptyValuablesList } from "./EmptyValuablesList";

const stories = storiesOf("EmptyValuablesList", module);

stories.add("Default", () => {
  const message = text("Message", "No Bonuses available") || null;
  return <EmptyValuablesList message={message} />;
});
