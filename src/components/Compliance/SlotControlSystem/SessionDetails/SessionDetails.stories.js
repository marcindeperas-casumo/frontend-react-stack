// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { SessionDetails } from "./SessionDetails";

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
  limits_reached_button_label: "Back to games",
};
const now = 1573824000160;
const stories = storiesOf(
  "Compliance/SlotControlSystem/SessionDetails",
  module
);
stories.add("Default", () => {
  return (
    <SessionDetails
      t={t}
      isLogout={boolean("isLogout", true)}
      locale="en-GB"
      balance={number("Balance", 112)}
      currency={select("Currency", { EUR: "EUR", GBP: "GBP" }, "EUR")}
      moneyWagered={number("Wagered", 10)}
      moneyLeft={32}
      moneyWon={12}
      playStarted={now - 1000 * 60 * 5}
      playEnded={now - 1000 * 60}
      lastStatusAlert={now - 1000 * 60 * 2}
      onClickButton={action("onClickButton")}
    />
  );
});
