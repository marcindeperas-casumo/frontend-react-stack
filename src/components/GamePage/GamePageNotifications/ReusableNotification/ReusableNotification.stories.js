import * as React from "react";
import { storiesOf } from "@storybook/react";
import { reusableNotificationTranslationsMock } from "./__mocks__";
import { ReusableNotification } from "./ReusableNotification";

const stories = storiesOf(
  "GamePage/GamePageNotifications/ReusableNotification",
  module
);

stories.add("Real Money Play Required", () => {
  const t = reusableNotificationTranslationsMock.realMoneyPlayRequired;
  return <ReusableNotification t={t} />;
});
