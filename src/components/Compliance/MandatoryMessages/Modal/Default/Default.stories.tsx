import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { Default } from "./Default";

const stories = storiesOf("Compliance/MandatoryMessages/Modal/Default", module);

stories.add("Default", () => {
  return (
    <Default
      topTitle="Default Modal Title"
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

stories.add("Busy while marking as read", () => {
  return (
    <Default
      topTitle="Default Modal Title"
      content="Message Content ${replacement}." // eslint-disable-line no-template-curly-in-string
      replacements={{
        replacement: "something else",
      }}
      primaryButton={{
        text: "Close",
        isDisabled: false,
        isLoading: true,
        action: () => action("Primary Button Clicked"),
      }}
    />
  );
});
