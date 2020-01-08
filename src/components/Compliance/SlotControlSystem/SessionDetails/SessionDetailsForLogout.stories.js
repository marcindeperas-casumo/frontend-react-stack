// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import activeSessionMock from "Models/slotControlSystem/__mocks__/activeSession.mock";
import { SessionDetailsForLogout } from "./SessionDetailsForLogout";

const t = {
  session_details_header: "Session details",
  balance: "Balance",
  money_wagered: "Money wagered",
  money_won: "Money won",
  money_left: "Money left",
  play_started: "Play started",
  play_ended: "Play ended",
  last_status_alert: "Last status alert",
  logout_button_label: "Logout",
  logout_text: "Here's a breakdown of your play session today:",
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/SessionDetailsForLogout",
  module
);
stories.add("Default", () => {
  return (
    <SessionDetailsForLogout
      t={t}
      locale="en-GB"
      activeSession={activeSessionMock}
      onClickButton={action("onClickButton")}
    />
  );
});
