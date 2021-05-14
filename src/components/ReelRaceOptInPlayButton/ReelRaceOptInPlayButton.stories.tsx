import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";
import type { TProps } from "./ReelRaceOptInPlayButton";

const stories = storiesOf("ReelRaceOptInPlayButton", module);

const props: TProps = {
  optIn: () => undefined,
  reelRace: {
    id: "666",
    startTime: 666,
    optedIn: false,
    endTime: 666,
    spinLimit: 666,
    promoted: false,
    formattedPrize: "string",
    formattedPrizes: ["100E", "200E", "300E"],
    remainingSpins: 666,
    game: {
      id: "string",
      name: "string",
      logo: "string",
      backgroundImage: "string",
      slug: "string",
      gameStudio: "string",
    },
    translations: {
      optedInCtaSingleGameShort: "Play",
      optIn: "Opt In",
      optedIn: "Opted In",
      endingIn: "string",
      startingIn: "string",
      competeFor: "string",
      minBet: "string",
      spins: "string",
      duration: "string",
      durationTemplate: "string",
      caveatShort: "string",
      today: "string",
      tomorrow: "string",
    },
  }
};

stories.add("Default", () => {
  return <ReelRaceOptInPlayButton {...props} />;
});

stories.add("Alternative colors schema", () => {
  return <ReelRaceOptInPlayButton {...props} variant="secondary" />;
});

stories.add("Opted-In - no play button", () => {
  const optedInProps: TProps = {
    ...props,
    reelRace: {
      ...props.reelRace,
      // didnt start yet
      startTime: + new Date() + 1000,
      optedIn: true,
    },
    showOptedIn: true
  };

  return <ReelRaceOptInPlayButton {...optedInProps} />;
});
