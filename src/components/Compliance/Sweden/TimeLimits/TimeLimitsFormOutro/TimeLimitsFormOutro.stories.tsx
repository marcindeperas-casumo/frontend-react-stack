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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: { activationTime: number; aut... Remove this comment to see the full error message
      dailyLimit={dailyLimitMock}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: any; comingRevocation: any; c... Remove this comment to see the full error message
      weeklyLimit={weeklyLimitMock}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ comingLimit: any; comingRevocation: any; c... Remove this comment to see the full error message
      monthlyLimit={monthlyLimitMock}
    />
  );
});
