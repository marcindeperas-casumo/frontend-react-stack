// @flow
import { getCurrentReelRace, calculateProgress } from "./reelRaces.utils";

const getReelRaces = () => {
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const now = Date.now();

  return [
    {
      id: "67ec38c0-6b88-11ea-a450-0242ac110006",
      game: {
        id: "3e054070-b89c-11e7-b304-005056a03af2",
        name: "Reactoonz",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_logo.png",
        backgroundImage:
          "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_thumbnail.jpg",
        slug: "reactoonz",
        __typename: "Game",
      },
      startTime: now + THIRTY_MINUTES * 3,
      optedIn: false,
      endTime: now + THIRTY_MINUTES * 4,
      status: "Scheduled",
      spinLimit: 475,
      minBet: null,
      promoted: true,
      formattedPrize: "₹40,000",
      remainingSpins: 0,
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
        __typename: "ReelRaceTranslations",
      },
      __typename: "ReelRace",
    },
    {
      id: "67423d20-6b88-11ea-a450-0242ac110006",
      game: {
        id: "23b59520-65cb-11e9-8dbf-0242ac110002",
        name: "Dead or Alive 2",
        logo:
          "https://cms.casumo.com/wp-content/uploads/2019/04/dead_or_alive_logo.png",
        backgroundImage:
          "https://cms.casumo.com/wp-content/uploads/2019/04/dead_or_alive_thumbnail.jpg",
        slug: "dead-or-alive-2",
        __typename: "Game",
      },
      startTime: now,
      optedIn: true,
      endTime: now + THIRTY_MINUTES,
      status: "Started",
      spinLimit: 180,
      minBet: null,
      promoted: false,
      formattedPrize: "₹1,600",
      remainingSpins: 0,
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
        __typename: "ReelRaceTranslations",
      },
      __typename: "ReelRace",
    },
  ];
};

describe("Models/reelRaces.utils", () => {
  describe("getCurrentReelRace", () => {
    test("return current reel race", () => {
      const rr = getReelRaces();
      expect(getCurrentReelRace(rr)).toBe(rr[1]);
    });
  });

  describe("calculateProgress", () => {
    test("no start time", () => {
      expect(calculateProgress(null, 30, 5)).toEqual(0);
    });
    test("no end time", () => {
      expect(calculateProgress(10, null, 5)).toEqual(0);
    });
    test("no start and end time", () => {
      expect(calculateProgress(null, null, 5)).toEqual(0);
    });
    test("race not started yet", () => {
      expect(calculateProgress(10, 30, 5)).toEqual(0);
    });
    test("race is finshed just now", () => {
      expect(calculateProgress(10, 30, 30)).toEqual(1);
    });
    test("race is finshed some time ago", () => {
      expect(calculateProgress(10, 30, 40)).toEqual(1);
    });
    test("race is at 25% progress", () => {
      expect(calculateProgress(10, 30, 15)).toEqual(0.25);
    });
    test("race is at 50% progress", () => {
      expect(calculateProgress(10, 30, 20)).toEqual(0.5);
    });
    test("race is at 75% progress", () => {
      expect(calculateProgress(10, 30, 25)).toEqual(0.75);
    });
  });
});
