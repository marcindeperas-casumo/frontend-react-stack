// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";
import { SessionDetailsForLimitsReachedExcluded } from "./SessionDetailsForLimitsReachedExcluded";

const t = {
  session_details_header: "Session details",
  balance: "Balance",
  money_wagered: "Money wagered",
  money_won: "Money won",
  money_left: "Money left",
  play_started: "Play started",
  play_ended: "Play ended",
  last_status_alert: "Last status alert",
  limits_reached_button_label: "Back to games",
  limits_reached_play_again_header: "Play it again",
  limits_reached_exclusion_text:
    "You've chosen to take a break after playing. You may continue playing in {{time}}.",
};
const tUnits = {
  seconds: "{{seconds}} seconds",
  minutes: "{{minutes}} minutes",
  hours: "{{ hours }} hours",
  days: "{{days}} days",
};
const state = {
  schema: {
    cms: {
      units: {
        fields: {
          ...tUnits,
        },
      },
    },
  },
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/SessionDetailsForLimitsReachedExcluded",
  module
);

stories.add("Default", () => {
  return (
    <MockStore state={state}>
      <SessionDetailsForLimitsReachedExcluded
        t={t}
        locale="en-GB"
        lastEndedSession={endedSessionMock}
        secondsTillEndOfBreak={number("Seconds till end of break", 100)}
        onClickButton={action("onClickButton")}
      />
    </MockStore>
  );
});
