// @flow
import React from "react";
import { shallow } from "enzyme";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

const props = {
  spinsLeft: "329",
  position: "10",
  ordinalSuffix: "th",
  points: "100",
  gameProgress: 27,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
  },
};

describe("ReelRaceDrawer", () => {
  const rendered = shallow(<ReelRacesDrawer {...props} />);

  test("should contain two checkered flags", () => {
    expect(rendered.find(".checkered-flag").length).toBe(2);
  });

  test("should contain correct ordinal to the user's current position", () => {
    expect(
      rendered
        .find(".rr-position")
        .find(".u-text-align-right")
        .text()
    ).toBe("th");
  });
});
