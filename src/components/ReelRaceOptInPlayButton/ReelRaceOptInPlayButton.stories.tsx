import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";
import type { TProps } from "./ReelRaceOptInPlayButton";

const stories = storiesOf("ReelRaceOptInPlayButton", module);

const props: TProps = {
  optIn: () => undefined,
  playCallback: () => undefined,
  showExtraTAC: false,
  onShowTAC: () => undefined,
  tacTranslations: {
    terms_link_text: "terms & conditions",
  },
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
  },
};

stories.add("Default", () => {
  return (
    <MockStore>
      <ReelRaceOptInPlayButton {...props} />
    </MockStore>
  );
});

stories.add("Alternative colors schema", () => {
  return (
    <MockStore>
      <ReelRaceOptInPlayButton {...props} variant="secondary" />
    </MockStore>
  );
});

stories.add("Opted-In - no play button", () => {
  const optedInProps: TProps = {
    ...props,
    reelRace: {
      ...props.reelRace,
      // didnt start yet
      startTime: Number(new Date()) + 1000,
      optedIn: true,
    },
    showOptedIn: true,
  };

  return (
    <MockStore>
      <ReelRaceOptInPlayButton {...optedInProps} />
    </MockStore>
  );
});
