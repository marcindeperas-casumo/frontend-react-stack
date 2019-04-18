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
      value="I am a {{ var }} in need of a <strong>{{val}}</strong>"
      replacements={{ var: "variable", val: "value" }}
    />
  ),
  info({ text: "Default" })
);
