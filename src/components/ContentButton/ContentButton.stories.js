import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContentButton from "./ContentButton";

const stories = storiesOf("ContentButton", module);

stories.add(
  "Default",
  () => <ContentButton text="gotchas" href="#" />,
  info({ text: "Default" })
);
