import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import MockStore from "Components/MockStore";
import { summaryWithSlotSession } from "Models/loginSession/__mocks__/summaryMocks";
import { SessionDetailsForLogout } from "./SessionDetailsForLogout";

const t = {
  session_details_header: "Session details",
  money_wagered: "Money wagered",
  money_won: "Money won",
  money_left: "Money left",
  play_started: "Play started",
  play_ended: "Play ended",
  logout_button_label: "Logout",
  logout_text: "Here's a breakdown of your play session today:",
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/SessionDetailsForLogout",
  module
);
stories.add("Default", () => {
  return (
    <MockStore>
      <SessionDetailsForLogout
        t={t}
        locale="en-GB"
        currency="EUR"
        loginSessionSummary={
          "loginSessionSummary" in summaryWithSlotSession
            ? summaryWithSlotSession.loginSessionSummary
            : null
        }
        slotSessionSummary={
          "slotSessionSummary" in summaryWithSlotSession
            ? summaryWithSlotSession.slotSessionSummary
            : null
        }
        onClickButton={action("onClickButton")}
      />
    </MockStore>
  );
});
