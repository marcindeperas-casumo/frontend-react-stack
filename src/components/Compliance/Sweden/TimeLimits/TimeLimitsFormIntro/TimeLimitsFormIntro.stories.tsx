// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsFormIntro } from "./TimeLimitsFormIntro";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsFormIntro",
  module
);

stories.add("Default", () => {
  return <TimeLimitsFormIntro t={cmsMock} onClickCta={() => {}} />;
});
