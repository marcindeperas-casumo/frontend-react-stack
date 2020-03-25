// @flow
import * as React from "react";
import { mount } from "enzyme";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useReelRaceLeaderboard } from "./useReelRaceLeaderboard";
import { leaderboard } from "./__mocks__/leaderboard.mock";

describe("useReelRaceLeaderboard", () => {
  describe("happy path", () => {
    const wrapper = mount(
      <MockStore state={defaultState}>
        <HookWrapper
          hook={useReelRaceLeaderboard}
          args={["tournamentId", ["cometd1", "cometd2"], leaderboard]}
        />
      </MockStore>
    );

    test("returns leaderboard array", () => {
      expectHook(wrapper).toEqual([
        {
          boosters: {
            bigWins: 0,
            megaWins: 0,
            triples: 0,
            wins: 0,
            winsInARow: 0,
          },
          playerId: "101112",
          playerName: "Goldofunky",
          points: 2345,
          position: 1,
          remainingSpins: 250,
        },
        {
          boosters: {
            bigWins: 0,
            megaWins: 0,
            triples: 0,
            wins: 0,
            winsInARow: 0,
          },
          playerId: "456",
          playerName: "Caramustia",
          points: 1098,
          position: 2,
          remainingSpins: 250,
        },
        {
          boosters: {
            bigWins: 0,
            megaWins: 0,
            triples: 0,
            wins: 0,
            winsInARow: 0,
          },
          playerId: "789",
          playerName: "Sisiento",
          points: 600,
          position: 3,
          remainingSpins: 250,
        },
      ]);
    });
  });
});
