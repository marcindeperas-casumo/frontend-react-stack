import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import dailyLimitMock from "Models/playOkay/limits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/limits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/limits/__mocks__/monthlyLimit";
import { adjustLimitMock } from "Models/playOkay";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";

const stories = storiesOf(
  "Compliance/SGA/TimeLimits/TimeLimitsFormOutro",
  module
);

stories.add("All 3 limits decreasing right away", () => {
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

stories.add("With coming limit increase", () => {
  return (
    <TimeLimitsFormOutro
      t={cmsMock}
      initial={boolean("Is initial?", false)}
      onClickCta={() => {}}
      dailyLimit={adjustLimitMock(dailyLimitMock, 23, true)}
      weeklyLimit={weeklyLimitMock}
      monthlyLimit={monthlyLimitMock}
    />
  );
});

stories.add("With coming revocation", () => {
  return (
    <TimeLimitsFormOutro
      t={cmsMock}
      initial={boolean("Is initial?", false)}
      onClickCta={() => {}}
      monthlyLimit={adjustLimitMock(monthlyLimitMock, 123, false, true)}
    />
  );
});
