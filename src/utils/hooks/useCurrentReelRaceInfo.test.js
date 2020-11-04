// @flow
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import defaultState from "Models/__mocks__/state.mock";
import { CurrentReelRaceInfoQuery } from "./useCurrentReelRaceInfo.graphql";
import {
  createCurrentReelRaceData,
  useCurrentReelRaceInfo,
  convertLeaderboardToObject,
  UNSET_VALUE,
} from "./useCurrentReelRaceInfo";

jest.mock("Lib/cometd"); // For some reason, this file executes and breaks tests here 🐛
jest.useFakeTimers();

describe("useCurrentReelRaceInfo", () => {
  const RealDateNow = Date.now;

  const mockDate = ts => {
    global.Date.now = () => ts;
  };
  afterEach(() => {
    global.Date.now = RealDateNow;
  });
  const playerId = "2bb42ab0-7937-11e8-b6b5-0242ac11000b";
  const playerName = "the player";
  const boosters = {
    winsInARow: 0,
    triples: 0,
    wins: 0,
    bigWins: 0,
    megaWins: 0,
  };
  describe("createCurrentReelRaceData", () => {
    const id = "some-nice-tournament-id";
    const game = "some nice game";
    const startTime = 10;
    const endTime = 30;
    const nowInProgress = 20;
    const leaderboardEntryOther = {
      playerId: 333,
      playerName: "player 1",
      position: 2,
      points: 999,
      remainingSpins: 7,
    };
    const leaderboardEntryMe = {
      playerId,
      playerName,
      position: 1,
      points: 555,
      remainingSpins: 76,
    };
    const formattedPrizes = ["$100"];
    const leaderboard = convertLeaderboardToObject([
      leaderboardEntryOther,
      leaderboardEntryMe,
    ]);

    const emptyResult = {
      game: null,
      startTime: UNSET_VALUE,
      endTime: UNSET_VALUE,
      position: UNSET_VALUE,
      points: 0,
      remainingSpins: UNSET_VALUE,
      isInProgress: false,
      hasEnded: false,
      tournamentId: null,
      formattedPrizes: [],
      leaderboard: [],
      boosters,
    };

    test("no data", () => {
      expect(createCurrentReelRaceData()).toEqual(emptyResult);
    });
    test("no player on the list", () => {
      mockDate(nowInProgress);
      expect(
        createCurrentReelRaceData(playerId, {
          id,
          startTime,
          endTime,
          game,
          formattedPrizes,
          leaderboard: convertLeaderboardToObject([leaderboardEntryOther]),
        })
      ).toEqual({
        ...emptyResult,
        isInProgress: true,
        hasEnded: false,
        game,
        startTime,
        endTime,
        tournamentId: id,
        formattedPrizes,
        leaderboard: [leaderboardEntryOther],
      });
    });
    test("first position", () => {
      mockDate(nowInProgress);
      expect(
        createCurrentReelRaceData(playerId, {
          id,
          startTime,
          endTime,
          game,
          formattedPrizes,
          leaderboard,
        })
      ).toEqual({
        isInProgress: true,
        hasEnded: false,
        game,
        startTime,
        endTime,
        position: leaderboardEntryMe.position,
        points: leaderboardEntryMe.points,
        remainingSpins: leaderboardEntryMe.remainingSpins,
        tournamentId: id,
        formattedPrizes,
        leaderboard: [leaderboardEntryMe, leaderboardEntryOther],
        boosters,
      });
    });
  });

  const genGame = slug => ({
    id: slug,
    slug,
    name: slug,
    logo: "https://logo.jpg",
    backgroundImage: "https://bg.jpg",
  });

  const genReelRace = ({
    slug,
    startTime,
    endTime,
    optedIn = false,
    promoted = false,
    spinLimit = 100,
    playerId: rrPlayerId = playerId,
    playerName: rrPlayerName = playerName,
    position = 1,
    points = 0,
    remainingSpins = 100,
  }) => ({
    id: slug,
    game: {
      ...genGame(slug),
      __typename: "Game",
    },
    startTime,
    endTime,
    optedIn,
    promoted,
    spinLimit,
    cometdChannels: [],
    formattedPrizes: [],
    leaderboard: [
      {
        playerId: rrPlayerId,
        playerName: rrPlayerName,
        position,
        points,
        remainingSpins,
        boosters: {
          winsInARow: 0,
          triples: 0,
          wins: 0,
          bigWins: 0,
          megaWins: 0,
          __typename: "ReelRaceBoosters",
        },
        __typename: "ReelRaceLeaderboard",
      },
    ],
    __typename: "ReelRace",
  });

  describe("hook", () => {
    const mocks = reelRaces =>
      Array(4).fill({
        request: {
          query: CurrentReelRaceInfoQuery,
        },
        result: {
          data: {
            reelRaces,
          },
        },
      });

    test("no reel races planned", () => {
      const wrapper = mount(
        <MockStore state={defaultState} queryMocks={mocks([])}>
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);

      wrapper.update();

      expectHook(wrapper).toBeNull();
    });
    test("all reel races finished", () => {
      mockDate(1000);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([
            genReelRace({
              slug: "reactoonz",
              startTime: 500,
              endTime: 700,
              optedIn: true,
              promoted: true,
            }),
          ])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);

      wrapper.update();

      expectHook(wrapper).toBeNull();
    });
    test("no opted in reel races", () => {
      mockDate(50);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([
            genReelRace({
              slug: "reactoonz",
              startTime: 100,
              endTime: 200,
              optedIn: false,
              promoted: false,
            }),
            genReelRace({
              slug: "book-of-dead",
              startTime: 300,
              endTime: 400,
              optedIn: false,
              promoted: false,
            }),
          ])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);

      wrapper.update();

      expectHook(wrapper).toBeNull();
    });
    test("find next not started reel race", () => {
      const nextRace = {
        slug: "book-of-dead",
        startTime: 100,
        endTime: 200,
        optedIn: true,
        promoted: false,
        remainingSpins: 99,
        points: 341,
        position: 42,
      };
      mockDate(80);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([
            genReelRace({
              slug: "reactoonz",
              startTime: 500,
              endTime: 700,
              optedIn: true,
              promoted: true,
            }),
            genReelRace(nextRace),
          ])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);
      wrapper.update();
      expectHook(wrapper).toEqual({
        isInProgress: false,
        hasEnded: false,
        endTime: nextRace.endTime,
        startTime: nextRace.startTime,
        position: nextRace.position,
        points: nextRace.points,
        remainingSpins: nextRace.remainingSpins,
        game: genGame(nextRace.slug),
        tournamentId: nextRace.slug,
        formattedPrizes: [],
        leaderboard: [
          {
            playerId,
            playerName,
            position: nextRace.position,
            points: nextRace.points,
            remainingSpins: nextRace.remainingSpins,
            boosters,
          },
        ],
        boosters,
      });
    });

    test("find running reel race - started just now", () => {
      const nextRace = {
        slug: "book-of-dead",
        startTime: 100,
        endTime: 200,
        optedIn: true,
        promoted: false,
        remainingSpins: 99,
        points: 341,
        position: 42,
      };
      mockDate(100);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([genReelRace(nextRace)])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);
      wrapper.update();
      expectHook(wrapper).toEqual({
        isInProgress: true,
        hasEnded: false,
        endTime: nextRace.endTime,
        startTime: nextRace.startTime,
        position: nextRace.position,
        points: nextRace.points,
        remainingSpins: nextRace.remainingSpins,
        game: genGame(nextRace.slug),
        tournamentId: nextRace.slug,
        formattedPrizes: [],
        leaderboard: [
          {
            playerId,
            playerName,
            position: nextRace.position,
            points: nextRace.points,
            remainingSpins: nextRace.remainingSpins,
            boosters,
          },
        ],
        boosters,
      });
    });

    test("find running reel race - finishes in a sec", () => {
      const nextRace = {
        slug: "book-of-dead",
        startTime: 100,
        endTime: 200,
        optedIn: true,
        promoted: false,
        remainingSpins: 99,
        points: 341,
        position: 42,
      };
      mockDate(199);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([genReelRace(nextRace)])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);
      wrapper.update();
      expectHook(wrapper).toEqual({
        isInProgress: true,
        hasEnded: false,
        endTime: nextRace.endTime,
        startTime: nextRace.startTime,
        position: nextRace.position,
        points: nextRace.points,
        remainingSpins: nextRace.remainingSpins,
        game: genGame(nextRace.slug),
        tournamentId: nextRace.slug,
        formattedPrizes: [],
        leaderboard: [
          {
            playerId,
            playerName,
            position: nextRace.position,
            points: nextRace.points,
            remainingSpins: nextRace.remainingSpins,
            boosters,
          },
        ],
        boosters,
      });
    });
    test("dont find reel race that has finished just now", () => {
      const nextRace = {
        slug: "book-of-dead",
        startTime: 100,
        endTime: 200,
        optedIn: true,
        promoted: false,
        remainingSpins: 99,
        points: 341,
        position: 42,
      };
      mockDate(200);
      const wrapper = mount(
        <MockStore
          state={defaultState}
          queryMocks={mocks([genReelRace(nextRace)])}
        >
          <HookWrapper hook={useCurrentReelRaceInfo} args={[]} />
        </MockStore>
      );
      act(jest.runOnlyPendingTimers);
      wrapper.update();
      expectHook(wrapper).toBeNull();
    });
  });
});
