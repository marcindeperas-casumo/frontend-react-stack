import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContentMustDropJackpotsWidget from "./";

const stories = storiesOf("ContentMustDropJackpotsWidget", module);

stories.add(
  "Default",
  () => (
    <ContentMustDropJackpotsWidget />
  ),
  info({ text: "Default" })
);