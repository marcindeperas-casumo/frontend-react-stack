// @flow
import React from "react";
import { shallow } from "enzyme";
import { ReelRaceCard } from "./ReelRaceCard";

const props = {
  id: "edc71c70-56d6-11e9-8587-0242ac11000b",
  startTime: 1580882400000,
  optedIn: false,
  endTime: 1580883600000,
  spinLimit: 140,
  minBet: null,
  promoted: false,
  formattedPrize: "€20",
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
  },
  optIn: () => {},
};

const minute = 60 * 1000;

const launchGame = jest.fn();

describe("ReelRaceCard", () => {
  describe("Scheduled", () => {
    const now = Date.now();
    const reelRace = {
      ...props,
      promoted: false,
      opted: false,
      startTime: now + 30 * minute,
      endTime: now + 60 * minute,
    };

    const rendered = shallow(
      <ReelRaceCard reelRace={reelRace} locale="en" loading={false} />
    );

    test('should show "Starting In" text', () => {
      expect(rendered.contains(props.translations.startingIn)).toBe(true);
    });
    test('should show "Opt In" button', () => {
      expect(
        rendered
          .find("OptInButton")
          .dive()
          .contains(props.translations.optIn)
      ).toBe(true);
    });

    test('should show "Opted In" button if user opted for race', () => {
      rendered.setProps({
        reelRace: {
          ...reelRace,
          optedIn: true,
        },
      });
      expect(
        rendered
          .find("OptInButton")
          .dive()
          .contains(props.translations.optedIn)
      ).toBe(true);
    });
  });

  describe("Ongoing", () => {
    const now = Date.now();
    const reelRace = {
      ...props,
      optedIn: true,
      startTime: now,
      endTime: now + 30 * minute,
      launchGame: launchGame,
    };
    const rendered = shallow(
      <ReelRaceCard reelRace={reelRace} locale="en" loading={false} />
    );

    test('should show "Ending In" text', () => {
      expect(rendered.contains(props.translations.endingIn)).toBe(true);
    });

    test('should show "Play" button', () => {
      expect(
        rendered
          .find("Button")
          .children()
          .contains(props.translations.optedInCtaSingleGameShort)
      ).toBe(true);
    });

    test("shouldn't contain promoted badge", () => {
      expect(rendered.find(".c-reel-race__badge")).toHaveLength(0);
    });
  });

  test("should show promoted badge", () => {
    const now = Date.now();
    const reelRace = {
      ...props,
      optedIn: true,
      promoted: true,
      startTime: now,
      endTime: now + 30 * minute,
    };
    const rendered = shallow(
      <ReelRaceCard reelRace={reelRace} locale="en" loading={false} />
    );

    expect(rendered.find(".c-reel-race__badge")).toHaveLength(1);
  });
});
