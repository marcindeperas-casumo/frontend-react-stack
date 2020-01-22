// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameSearchNotFound } from "./";

const stories = storiesOf("GameSearchNotFound", module);

stories.add(
  "Default",
  () => (
    <GameSearchNotFound msg="howdy! 🤠" />
  )
);
