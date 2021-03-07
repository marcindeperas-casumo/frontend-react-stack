// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import activeSessionMock from "Models/slotControlSystem/__mocks__/activeSession.mock";
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
        playEndedTime={activeSessionMock.startedTime + 100 * 1000}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; expiringTime: number; startedT... Remove this comment to see the full error message
        activeSession={activeSessionMock}
        onClickButton={action("onClickButton")}
      />
    </MockStore>
  );
});
