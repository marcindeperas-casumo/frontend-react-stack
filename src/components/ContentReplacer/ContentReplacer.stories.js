// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContentReplacer from "./";

const stories = storiesOf("ContentReplacer", module);

stories.add(
  "Default",
  () => (
    <ContentReplacer
      value="I am a {{var}} in need of a {{{val}}}"
      replacements={{ var: "variable", val: "<strong>value</strong>" }}
    />
  ),
  info({ text: "Default" })
);
