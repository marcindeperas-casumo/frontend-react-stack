// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import MockDate from "mockdate";
import { ReelRaceCard } from "./ReelRaceCard";

const stories = storiesOf("ReelRaceCard", module);

const minute = 60 * 1000;
const props = {
  spinLimit: 666,
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
    jackpotId: null,
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    minBet: "Min Bet",
    startingIn: "Starting in",
    endingIn: "Ending in",
    optIn: "Opt In",
    optedIn: "Opted In",
    play: "Play",
    prize: "Compete for",
  },
};

MockDate.set(new Date().toString());
const now = Date.now();

stories.add("Default", () => {
  const type = select("Type", ["Standard", "Promoted"], "Standard");
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
      status="Scheduled"
      type={type}
      opted={opted}
      color={color}
      {...timeOptions[time]}
    />
  );
});

MockDate.reset();
