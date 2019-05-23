// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { ReelRaceCard } from "./ReelRaceCard";

const stories = storiesOf("ReelRaceCard", module);

const minute = 60 * 1000;
const props = {
  tournamentId: "1",
  spins: 666,
  minBet: "€0.50",
  prize: "€666",
  game: {
    name: "Gonzo&#8217;s Quest",
    slug: "gonzos-quest",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
    hasPlayForFun: true,
    inMaintenanceMode: false,
    jackpotInfo: null,
    lobby: null,
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    duration_template: "{{{duration}}} min",
    min_bet: "Min Bet",
    starting_in: "Starting in",
    ending_in: "Ending in",
    opt_in: "Opt In",
    opted_in: "Opted In",
    opted_in_cta_single_game_short: "Play",
    compete_for: "Compete for {{prize}}",
    title: "Reel Races",
    caveat_short: "false",
  },
};

if (isChromatic) {
  MockDate.set(new Date().toString());
}

const now = Date.now();

stories.add("Default", () => {
  const promoted = select("Promoted", [false, true], false);
  const opted = select("Opted", [false, true], false);
  const time = select("Time", ["scheduled", "ongoing"], "scheduled");
  const color = select(
    "Color",
    [
      "blue-light-2",
      "green-light-3",
      "orange-light-1",
      "teal",
      "yellow-light-1",
    ],
    "yellow-light-1"
  );
  const timeOptions = {
    scheduled: {
      startTime: now + 30 * minute,
      endTime: now + 60 * minute,
    },
    ongoing: {
      startTime: now,
      endTime: now + 30 * minute,
    },
  };

  return (
    <ReelRaceCard
      {...props}
      promoted={promoted}
      opted={opted}
      color={color}
      {...timeOptions[time]}
    />
  );
});
