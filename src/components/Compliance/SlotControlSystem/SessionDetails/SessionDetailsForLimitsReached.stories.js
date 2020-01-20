// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select } from "@storybook/addon-knobs/react";
import MockStore from "Components/MockStore";
import endedSessionMock from "Models/slotControlSystem/__mocks__/endedSession.mock";
import { SessionDetailsForLimitsReached } from "./SessionDetailsForLimitsReached";

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
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/SessionDetailsForLimitsReached",
  module
);
const gameIds = ["gonzos-quest", "bloodsuckers"];

stories.add("Default", () => {
  return (
    <MockStore>
      <SessionDetailsForLimitsReached
        t={t}
        locale="en-GB"
        playAgainGameId={select("Game Id", gameIds, gameIds[0])}
        lastEndedSession={endedSessionMock}
        onClickButton={action("onClickButton")}
        onClickPlayAgain={action("onClickPlayAgain")}
      />
    </MockStore>
  );
});
