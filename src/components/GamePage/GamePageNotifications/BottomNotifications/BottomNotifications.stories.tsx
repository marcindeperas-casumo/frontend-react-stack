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
        notifications={[
          "This is a longer message which doesn't really fit into single line of text on smaller devices, yes that's correct",
          "Second, shorter message",
        ]}
      />
    </div>
  );
});
