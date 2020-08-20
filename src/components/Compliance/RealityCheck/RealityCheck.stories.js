// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import MockStore from "Components/MockStore";
import { RealityCheck } from "./RealityCheck";

const t = {
  reality_check_title: "Hi there.",
  reality_check_message:
    "You have now been playing for {{ totalMinutesPlayed }} minutes.",
  reality_check_amount_lost_message:
    "In this session you have lost {{ amount | € }}",
  reality_check_game_round_history_button_text: "View history",
  reality_check_continue_button_text: "Continue playing",
  reality_check_exit_game_button_text: "Change game",
  reality_check_logout_label: "Logout",
};
const stories = storiesOf("Compliance/RealityCheck", module);
const sessionStartedTime = 1575624543323;

MockDate.set(new Date(sessionStartedTime + 360000).toString());

const realityCheck = {
  totalWinAmount: {
    amount: 70,
    iso4217CurrencyCode: "SEK",
  },
  totalBetAmount: {
    amount: 20,
    iso4217CurrencyCode: "SEK",
  },
  sessionStartedTime,
  intervalSeconds: 60,
};

stories.add("Default", () => {
  return (
    <MockStore>
      <RealityCheck
        casumoName="Cayetano"
        realityCheck={realityCheck}
        currency="GBP"
        locale="en-gb"
        onClickCancel={action("onClickCancel")}
        onClickContinue={action("onClickContinue")}
        t={t}
      />
    </MockStore>
  );
});
