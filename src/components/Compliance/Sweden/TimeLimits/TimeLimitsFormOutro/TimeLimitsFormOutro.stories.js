// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsFormOutro",
  module
);

stories.add("Default", () => {
  return <TimeLimitsFormOutro t={cmsMock} onClickCta={() => {}} />;
});
