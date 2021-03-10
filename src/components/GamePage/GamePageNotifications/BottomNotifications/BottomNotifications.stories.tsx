import { storiesOf } from "@storybook/react";
import React from "react";
import { BottomNotifications } from "./BottomNotifications";

const stories = storiesOf(
  "GamePage/GamePageNotifications",
  module
).addParameters({ noGlobalDecorator: true });

stories.add("Bottom notification", () => {
  return (
    <div className="u-width--screen u-height--screen">
      <BottomNotifications
        notifications={["First message", "Second message"]}
      />
    </div>
  );
});
