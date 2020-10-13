// @flow
import React from "react";
import { mount } from "enzyme";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

const props = {
  spinsLeft: "329",
  position: "10",
  points: "100",
  gameProgress: 27,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
    reel_races_drawer_full_leaderboard: "full leaderbaord",
  },
};

describe("ReelRaceDrawer", () => {
  const rendered = mount(<ReelRacesDrawer {...props} />);

  test("should contain two checkered flags", () => {
    expect(rendered.find(".c-checkered-flag").length).toBe(2);
  });
});
