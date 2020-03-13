// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import durationTranslationsMock from "Components/i18n/ISO8601Duration/__mocks__/translations";
import { StillOnBreak } from "./StillOnBreak";

const t = {
  still_on_break: "You're still on break",
  still_on_break_subtext: "You may continue playing in {{time}}",
  still_on_break_button_label: "Got it",
};
const state = {
  schema: {
    cms: {
      "i18n.durations": {
        fields: {
          ...durationTranslationsMock,
        },
      },
    },
  },
};
const stories = storiesOf("Compliance/SlotControlSystem/StillOnBreak", module);
stories.add("Default", () => {
  return (
    <MockStore state={state}>
      <StillOnBreak t={t} onClick={action("clicked")} secondsTillEnd={900} />
    </MockStore>
  );
});
