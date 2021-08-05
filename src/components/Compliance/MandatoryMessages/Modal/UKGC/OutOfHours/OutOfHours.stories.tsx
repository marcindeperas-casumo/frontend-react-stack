import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { Default } from "./../../Default/Default";

const stories = storiesOf("Compliance/MandatoryMessages/Modal/UKGC/OutOfHours", module);

stories.add("Blocked (9s remaining)", () => {
  return (
    <Default
      topTitle="Out Of Hours UK"
      content="Message Content ${replacement}."
      replacements={{
        replacement: "something else"
      }}
      primaryButton={{
        text: "9",
        isDisabled: true,
        isLoading: false,
        action: () => action("Primary Button Clicked")
      }}
    />
  );
});

stories.add("Unblocked", () => {
  return (
    <Default
      topTitle="Out Of Hours UK"
      content="Message Content ${replacement}."
      replacements={{
        replacement: "something else"
      }}
      primaryButton={{
        text: "Close",
        isDisabled: false,
        isLoading: false,
        action: () => action("Primary Button Clicked")
      }}
    />
  );
});
