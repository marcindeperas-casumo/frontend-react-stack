// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRacesDrawer } from "./ReelRacesDrawer";

const stories = storiesOf("ReelRaceDrawer", module);

const props = {
  spinsLeft: "329",
  position: "10",
  points: "100",
  gameProgress: 20,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
  },
};

const WrapperDesktop = ({ children }) => (
  <>
    <SidebarElementWrapper pinnable>{children}</SidebarElementWrapper>
    <br />
    <br />
    <SidebarElementWrapper>{children}</SidebarElementWrapper>
  </>
);

const Wrapper = ({ children }) => <div>{children}</div>;

const story = () => (
  <Wrapper>
    <ReelRacesDrawer {...props} />
  </Wrapper>
);

const storyDesktop = () => (
  <Wrapper>
    <ReelRacesDrawer {...props} />
    <br />
    <br />
    <WrapperDesktop>
      <ReelRacesDrawer {...props} />
    </WrapperDesktop>
  </Wrapper>
);

stories.add("Desktop", storyDesktop, viewports.desktop);
stories.add("Tablet", story, viewports.tablet);
stories.add("Phablet", story, viewports.phablet);
stories.add("Mobile", story, viewports.mobile);
