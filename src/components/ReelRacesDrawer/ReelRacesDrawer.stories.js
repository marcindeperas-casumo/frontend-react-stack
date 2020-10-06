// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

const stories = storiesOf("ReelRaceDrawer", module);

const props = {
  spinsLeft: "329",
  position: "10",
  points: "100",
  gameProgress: 25,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
  },
};

const Wrapper = ({ children }) => <div>{children}</div>;

const story = () => (
  <Wrapper>
    <ReelRacesDrawer {...props} />
  </Wrapper>
);

stories.add("Desktop", story, viewports.desktop);
stories.add("Tablet", story, viewports.tablet);
stories.add("Phablet", story, viewports.phablet);
stories.add("Mobile", story, viewports.mobile);
