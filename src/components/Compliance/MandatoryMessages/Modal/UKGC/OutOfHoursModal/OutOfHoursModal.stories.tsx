import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { DefaultModal } from "./../../DefaultModal/DefaultModal";

const stories = storiesOf(
  "Compliance/MandatoryMessages/Modal/UKGC/OutOfHoursModal",
  module
);

stories.add("Blocked (9s remaining)", () => {
  return (
    <DefaultModal
      topTitle="Out Of Hours UK"
      content="Message Content ${replacement}." // eslint-disable-line no-template-curly-in-string
      replacements={{
        replacement: "something else",
      }}
      primaryButton={{
        text: "9",
        isDisabled: true,
        isLoading: false,
        action: () => action("Primary Button Clicked"),
      }}
    />
  );
});

stories.add("Unblocked", () => {
  return (
    <DefaultModal
      topTitle="Out Of Hours UK"
      content="Message Content ${replacement}." // eslint-disable-line no-template-curly-in-string
      replacements={{
        replacement: "something else",
      }}
      primaryButton={{
        text: "Close",
        isDisabled: false,
        isLoading: false,
        action: () => action("Primary Button Clicked"),
      }}
    />
  );
});
