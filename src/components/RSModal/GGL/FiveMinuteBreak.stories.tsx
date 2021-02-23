// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import {
  FiveMinuteBreakFinishedModal,
  FiveMinuteBreakOngoingModal,
  FiveMinuteBreakReelRaceModal,
} from "./index";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

const cmsContent = {
  content: {
    break_image:
      "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-break.svg",
    break_title: "{{timeLeft}} until you can play again",
    break_message:
      "This is an hourly reminder to make sure you take a break and Play Okay. When the timer runs out you’ll be able to play again.",
    break_button_label: "Back to Lobby",
    break_finished_image:
      "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-play.svg",
    break_finished_title: "Break’s over, time to play!",
    break_finished_message:
      "Your 5 minute break is over. Just a reminder that this will happen every hour you play. Now go on and play! Remember to be responsible and Play Okay",
    break_finished_button_label: "Continue Playing",
    break_reel_race_image:
      "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-break.svg",
    break_reel_race_title: "You won’t be able to play the full race",
    break_reel_race_message:
      "To make sure you Play Okay, we give all players a 5 minute break every hour spent playing.<br><br>You’ll still place in the leaderboard once the race finishes, but will miss {{timeMissed}} minutes from the full {{tournamentLength}} minutes.<br><br>Every other player in this race who has been playing for 60 minutes, also faces a 5 minute break.",
    break_reel_race_button_label: "Got It",
  },
};

const stories = storiesOf("RSModal/GGL/FiveMinuteBreak", module);
stories.add("Finished", () => {
  return (
    <FiveMinuteBreakFinishedModal
      config={{ ...cmsContent }}
      acceptModal={action("accepted modal")}
    />
  );
});
stories.add("Ongoing", () => {
  return (
    <FiveMinuteBreakOngoingModal
      config={{
        ...cmsContent,
        timeLeft: Date.now() + 5 * 60 * 1000,
        extraActionOnAccept: action("navigated to KO"),
      }}
      acceptModal={action("accepted modal")}
    />
  );
});
stories.add("ReelRaceWarning", () => {
  return (
    <FiveMinuteBreakReelRaceModal
      config={{ ...cmsContent, timeMissed: 15, tournamentLength: 25 }}
      acceptModal={action("accepted modal")}
    />
  );
});
