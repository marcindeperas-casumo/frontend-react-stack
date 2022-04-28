import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { ReelRaceCard } from "./ReelRaceCard";

const props = {
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
  status: "Started",
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
    today: "sss",
    tomorrow: "xx",
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

    const rendered = mount(
      <MockStore>
        {/* // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <ReelRaceCard reelRace={reelRace} optIn={() => undefined} />
      </MockStore>
    );

    test('should show "Ending In" text', () => {
      expect(rendered.html().includes(props.translations.endingIn)).toBe(true);
    });
    test('should show "Opt In" button', () => {
      expect(rendered.html().includes(props.translations.optIn)).toBe(true);
    });

    test('should show "Opted In" button if user opted for race', () => {
      const reelRaceOptedIn = {
        ...reelRace,
        optedIn: true,
      };

      const renderedOptedIn = mount(
        <MockStore>
          {/* // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
          <ReelRaceCard reelRace={reelRaceOptedIn} optIn={() => undefined} />
        </MockStore>
      );

      expect(renderedOptedIn.html().includes(props.translations.optedIn)).toBe(
        true
      );
    });
  });

  describe("Ongoing", () => {
    const now = Date.now();
    const reelRace = {
      ...props,
      optedIn: true,
      startTime: now,
      status: "Started",
      endTime: now + 30 * minute,
      launchGame: launchGame,
    };

    const rendered = mount(
      <MockStore>
        {/* // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <ReelRaceCard reelRace={reelRace} optIn={() => undefined} />
      </MockStore>
    );

    test('should show "Ending In" text', () => {
      expect(rendered.html().includes(props.translations.endingIn)).toBe(true);
    });

    test('should show "Play" button', () => {
      expect(
        rendered.html().includes(props.translations.optedInCtaSingleGameShort)
      ).toBe(true);
    });

    test("shouldn't contain promoted badge", () => {
      expect(rendered.html().includes(".c-reel-race__badge")).toBe(false);
    });
  });

  test("should show promoted badge", () => {
    const now = Date.now();
    const reelRace = {
      ...props,
      optedIn: true,
      promoted: true,
      status: "Scheduled",
      startTime: now,
      endTime: now + 30 * minute,
    };

    const rendered = mount(
      <MockStore>
        {/* // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <ReelRaceCard reelRace={reelRace} optIn={() => undefined} />
      </MockStore>
    );
    expect(rendered.html().includes(".c-reel-race__badge")).toBe(false);
  });
});
