import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import MockStore from "Components/MockStore";
import { adjustLimitMock } from "Models/playOkay";
import dailyLimitMock from "Models/playOkay/timeLimits/__mocks__/dailyLimit";
import weeklyLimitMock from "Models/playOkay/timeLimits/__mocks__/weeklyLimit";
import monthlyLimitMock from "Models/playOkay/timeLimits/__mocks__/monthlyLimit";
import stateMock from "Components/Duration/__mocks__/state";
import cmsMock from "./__mocks__/cms";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";

const stories = storiesOf(
  "Compliance/SGA/TimeLimits/TimeLimitsCardMobile",
  module
);

stories.add("All limits defined, no incoming changes", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile
        t={cmsMock}
        onClick={action("card clicked")}
        dailyLimit={adjustLimitMock(dailyLimitMock)}
        weeklyLimit={adjustLimitMock(weeklyLimitMock)}
        monthlyLimit={adjustLimitMock(monthlyLimitMock)}
      />
    </MockStore>
  );
});

stories.add("No limits defined, no incoming changes", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile t={cmsMock} onClick={action("card clicked")} />
    </MockStore>
  );
});

stories.add("Weekly limit defined", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile
        t={cmsMock}
        onClick={action("card clicked")}
        weeklyLimit={weeklyLimitMock}
      />
    </MockStore>
  );
});

stories.add("New Daily limit coming", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile
        t={cmsMock}
        onClick={action("card clicked")}
        dailyLimit={adjustLimitMock(dailyLimitMock, 11, true)}
      />
    </MockStore>
  );
});

stories.add("Monthly limit revocation coming", () => {
  return (
    <MockStore state={stateMock}>
      <TimeLimitsCardMobile
        t={cmsMock}
        onClick={action("card clicked")}
        dailyLimit={dailyLimitMock}
        monthlyLimit={adjustLimitMock(monthlyLimitMock, 111, false, true)}
      />
    </MockStore>
  );
});
