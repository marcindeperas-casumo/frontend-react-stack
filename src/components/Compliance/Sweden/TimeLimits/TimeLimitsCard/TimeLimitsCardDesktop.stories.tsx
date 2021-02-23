// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import dailyLimitMock from "Models/playOkay/timeLimits/__mocks__/dailyLimit";
import stateMock from "Components/Duration/__mocks__/state";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCardDesktop } from "./TimeLimitsCardDesktop";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsCardDesktop",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardDesktop
        t={cmsMock}
        onClick={action("card clicked")}
        limit={dailyLimitMock}
      />
    </MockStore>
  );
});
