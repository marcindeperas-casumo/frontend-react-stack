// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import durationTranslationsMock from "Components/Duration/__mocks__/translations";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";
import { SessionDetailsForLimitsReachedExcluded } from "./SessionDetailsForLimitsReachedExcluded";

const t = {
  session_details_header: "Session details",
  money_wagered: "Money wagered",
  money_won: "Money won",
  money_left: "Money left",
  play_started: "Play started",
  play_ended: "Play ended",
  limits_reached_button_label: "Back to games",
  limits_reached_play_again_header: "Play it again",
  limits_reached_exclusion_text:
    "You've chosen to take a break after playing. You may continue playing in {{time}}.",
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

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

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
        endTime={Date.now() + 111111}
        onClickButton={action("onClickButton")}
      />
    </MockStore>
  );
});
