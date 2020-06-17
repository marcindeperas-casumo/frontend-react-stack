// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import cmsMock from "./__mocks__/cms";
import stateMock from "./__mocks__/state";
import { TimeLimitsForm } from "./TimeLimitsForm";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsForm",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsForm t={cmsMock} onClickCta={() => {}} />
    </MockStore>
  );
});
