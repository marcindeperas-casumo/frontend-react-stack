import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import dailyLimitMock from "Models/playOkay/limits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/limits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/limits/__mocks__/monthlyLimit";
import { adjustLimitMock } from "Models/playOkay";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";

const stories = storiesOf(
  "Compliance/SGA/TimeLimits/TimeLimitsCardMobile",
  module
);

stories.add("All limits defined, no incoming changes", () => {
  return (
    <TimeLimitsCardMobile
      t={cmsMock}
      onClick={action("card clicked")}
      dailyLimit={adjustLimitMock(dailyLimitMock)}
      weeklyLimit={adjustLimitMock(weeklyLimitMock)}
      monthlyLimit={adjustLimitMock(monthlyLimitMock)}
    />
  );
});

stories.add("No limits defined, no incoming changes", () => {
  return <TimeLimitsCardMobile t={cmsMock} onClick={action("card clicked")} />;
});

stories.add("Weekly limit defined", () => {
  return (
    <TimeLimitsCardMobile
      t={cmsMock}
      onClick={action("card clicked")}
      weeklyLimit={weeklyLimitMock}
    />
  );
});

stories.add("New Daily limit coming", () => {
  return (
    <TimeLimitsCardMobile
      t={cmsMock}
      onClick={action("card clicked")}
      dailyLimit={adjustLimitMock(dailyLimitMock, 11, true)}
    />
  );
});

stories.add("Monthly limit revocation coming", () => {
  return (
    <TimeLimitsCardMobile
      t={cmsMock}
      onClick={action("card clicked")}
      dailyLimit={dailyLimitMock}
      monthlyLimit={adjustLimitMock(monthlyLimitMock, 111, false, true)}
    />
  );
});
