// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { WrapperPin } from "./WrapperPin";

const stories = storiesOf("WrapperPin", module);

stories.add("Default", () => {
  return <WrapperPin />;
});
