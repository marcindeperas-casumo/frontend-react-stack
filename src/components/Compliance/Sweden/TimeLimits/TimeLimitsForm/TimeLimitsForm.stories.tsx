// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { prepareStateMock } from "Models/playOkay";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsForm } from "./TimeLimitsForm";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsForm",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={prepareStateMock({ loginTimeLimits: { daily: true } })}>
      <TimeLimitsForm t={cmsMock} isFetching={false} onClickCta={() => {}} />
    </MockStore>
  );
});
