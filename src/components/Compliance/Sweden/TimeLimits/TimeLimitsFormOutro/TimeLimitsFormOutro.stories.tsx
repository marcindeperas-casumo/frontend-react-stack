// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import dailyLimitMock from "Models/playOkay/timeLimits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/timeLimits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/timeLimits/__mocks__/monthlyLimit";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";

const stories = storiesOf(
  "Compliance/Sweden/TimeLimits/TimeLimitsFormOutro",
  module
);

stories.add("Default", () => {
  return (
    <TimeLimitsFormOutro
      t={cmsMock}
      initial={boolean("Is initial?", false)}
      onClickCta={() => {}}
      dailyLimit={dailyLimitMock}
      weeklyLimit={weeklyLimitMock}
      monthlyLimit={monthlyLimitMock}
    />
  );
});
