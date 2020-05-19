// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsForm } from "./TimeLimitsForm";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsForm",
  module
);

stories.add("Default", () => {
  return <TimeLimitsForm t={cmsMock} />;
});
