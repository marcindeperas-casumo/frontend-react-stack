import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";

// currently in progress
const reelRace = {
  id: "edc71c70-56d6-11e9-8587-0242ac11000b",
  startTime: Number(new Date()) - 3000,
  optedIn: false,
  endTime: Number(new Date()) + 10000,
  spinLimit: 140,
  minBet: null,
  promoted: false,
  formattedPrize: "€20",
  formattedPrizes: ["1", "2"],
  remainingSpins: 99,
  status: "Scheduled",
  game: {
    id: "fa9aa550-6be1-11e4-a1d6-005056a03af2",
    name: "Jack and the Beanstalk",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/JackOfTheBeanstalk_Logo.png",
    backgroundImage:
      "https://cms.casumo.com/wp-content/uploads/2014/06/JackOfTheBeanstalk_Thumb.jpg",
    slug: "jack-the-beanstalk",
    gameStudio: "game-studio",
  },
  translations: {
    optedInCtaSingleGameShort: "Play",
    optIn: "Opt in",
    optedIn: "Opted in",
    endingIn: "Ending in",
    startingIn: "Starting in:",
    competeFor: "Compete for {{prize}}",
    spins: "Spins",
    duration: "Duration",
    durationTemplate: "{{{duration}}} min",
    minBet: "Min Bet",
    caveatShort: "false",
    today: "sss",
    tomorrow: "xx",
  },
};

describe("ReelRaceOptInPlayButton", () => {
  test("should call optIn callback", () => {
    const onOptIn = jest.fn();
    const rendered = mount(
      <MockStore>
        <ReelRaceOptInPlayButton reelRace={reelRace} optIn={onOptIn} />
      </MockStore>
    );

    expect(onOptIn).toHaveBeenCalledTimes(0);
    rendered.find(ButtonPrimary).simulate("click");
    expect(onOptIn).toHaveBeenCalledTimes(1);
  });

  test("should render button using secondary theme", () => {
    const onOptIn = jest.fn();
    const rendered = mount(
      <MockStore>
        <ReelRaceOptInPlayButton
          reelRace={reelRace}
          optIn={onOptIn}
          variant="secondary"
        />
      </MockStore>
    );

    expect(rendered.find(ButtonSecondary)).toHaveLength(1);
  });
});
