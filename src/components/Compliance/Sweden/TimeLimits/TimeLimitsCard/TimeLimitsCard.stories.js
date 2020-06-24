// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import dailyLimitMock from "Models/playOkay/timeLimits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/timeLimits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/timeLimits/__mocks__/monthlyLimit";
import stateMock from "Components/Duration/__mocks__/state";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCard } from "./TimeLimitsCard";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsCard",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCard
        t={cmsMock}
        onClick={action("card clicked")}
        dailyLimit={dailyLimitMock}
        weeklyLimit={weeklyLimitMock}
        monthlyLimit={monthlyLimitMock}
      />
    </MockStore>
  );
});
