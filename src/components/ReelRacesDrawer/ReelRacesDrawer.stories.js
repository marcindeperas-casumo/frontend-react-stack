// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

const stories = storiesOf("ReelRaceDrawer", module);

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

stories.add("Default", () => {
  return <ReelRacesDrawer {...props} />;
});
