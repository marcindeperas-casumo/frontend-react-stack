// @flow
import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { ReelRacesDrawerWidget } from "./ReelRacesDrawerWidget";

const getCurrentRace = (value = null) => ({
  position: value || 1,
  remainingSpins: value || 99,
  points: value || 42,
  startTime: Date.now() - 10000,
  endTime: Date.now() + 3000,
  boosters: {
    winsInARow: 0,
    bigWins: 0,
    megaWins: 0,
  },
});

const props = {
  spinsLeft: "329",
  position: "10",
  points: "100",
  boosters: { winsInARow: 3, bigWins: 1, megaWins: 2, wins: 10, triples: 3 },
  gameProgress: 27,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
    reel_races_drawer_full_leaderboard: "full leaderbaord",
  },
  currentRace: getCurrentRace(),
};
const playerId = "a1";

describe("ReelRaceDrawer", () => {
  const rendered = mount(
    <MockStore
      state={{
        handshake: {
          app: {
            "common/composition/session": {
              id: playerId,
            },
          },
        },
        reelRaces: {
          leaderboard: {
            [playerId]: getCurrentRace(),
          },
        },
      }}
    >
      <ReelRacesDrawerWidget {...props} />
    </MockStore>
  );

  test("should contain two checkered flags", () => {
    expect(rendered.find(".c-checkered-flag").length).toBe(2);
  });
});
