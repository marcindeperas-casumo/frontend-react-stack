import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import * as React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { RealityCheck } from "./RealityCheck";

const t = {
  reality_check_title: "Hi there.",
  reality_check_message:
    "You have now been playing for {{ totalMinutesPlayed }} minutes.",
  reality_check_amount_won_message:
    "In this session you have won {{ amount | € }}",
  reality_check_amount_lost_message:
    "In this session you have lost {{ amount | € }}",
  reality_check_game_round_history_button_text: "View history",
  reality_check_continue_button_text: "Continue playing",
  reality_check_exit_game_button_text: "Change game",
  reality_check_logout_label: "Logout",
};
const stories = storiesOf("Compliance/RealityCheck", module);
const sessionStartedTime = 1575624543323;

if (isChromatic) {
  MockDate.set(new Date(sessionStartedTime + 360000).toString());
}

const win = {
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

const loss = {
  ...win,
  totalWinAmount: {
    amount: -40,
    iso4217CurrencyCode: "SEK",
  },
};

stories.add("Win", () => {
  return (
    <MockStore>
      <RealityCheck
        casumoName="Cayetano"
        realityCheck={win}
        currency="GBP"
        locale="en-gb"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ casumoName: string; realityCheck: { totalW... Remove this comment to see the full error message
        onClickCancel={action("onClickCancel")}
        onClickContinue={action("onClickContinue")}
        t={t}
      />
    </MockStore>
  );
});

stories.add("Loss", () => {
  return (
    <MockStore>
      <RealityCheck
        casumoName="Cayetano"
        realityCheck={loss}
        currency="GBP"
        locale="en-gb"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ casumoName: string; realityCheck: { totalW... Remove this comment to see the full error message
        onClickCancel={action("onClickCancel")}
        onClickContinue={action("onClickContinue")}
        t={t}
      />
    </MockStore>
  );
});
