// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { REEL_RACE_STATE } from "Models/reelRaceWidget";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useReelRaceLeaderboard } from "./reelRaceWidget.leaderboard.hook";

const THIRTY_MINUTES = 30 * 60 * 1000;
const now = Date.now();

const leaderboard = {
  player1: {
    remainingSpins: 30,
  },
};

const state = {
  schema: {
    reelRaces: {
      "1": {
        tournamentId: "1",
        startTime: now - THIRTY_MINUTES,
        endTime: now + THIRTY_MINUTES * 2,
        opted: true,
        status: REEL_RACE_STATE.STARTED,
        leaderboard,
      },
    },
  },
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            tournamentCampaign: {
              tournamentChannels: ["/public/tournaments/123"],
            },
          },
        },
      },
    },
  },
};

describe("useReelRaceLeaderboard", () => {
  describe("happy path", () => {
    const wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useReelRaceLeaderboard} args={[]} />
      </MockStore>
    );

    test("returns leaderboard", () => {
      expectHook(wrapper).toEqual(leaderboard);
    });
  });
});
