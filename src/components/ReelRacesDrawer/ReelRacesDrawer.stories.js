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
  boosters: { winsInARow: 3, bigWins: 1, megaWins: 2, wins: 10, triples: 3 },
  gameProgress: 20,
  gameDuration: 25,
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
    reel_races_drawer_full_leaderboard: "full leaderboard",
  },
};

const WrapperDesktop = ({ children, ...rest }) => (
  <SidebarElementWrapper {...rest}>{children}</SidebarElementWrapper>
);

const Wrapper = ({ children }) => <div>{children}</div>;

const WithLeaderboard = () => {
  const [lb, setLb] = React.useState(false);

  return (
    <div>
      <WrapperDesktop>
        <ReelRacesDrawer
          {...props}
          onShowLeaderboardClick={() => setLb(x => !x)}
          showLeaderboardLink
        />
      </WrapperDesktop>
      {lb && (
        <WrapperDesktop>
          <div>Leaderboard</div>
        </WrapperDesktop>
      )}
    </div>
  );
};
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
    <br />
    <br />
    <WrapperDesktop pinnable>
      <ReelRacesDrawer {...props} />
    </WrapperDesktop>
    <br />
    <br />
    <WithLeaderboard />
  </Wrapper>
);

stories.add("Desktop", storyDesktop, viewports.desktop);
stories.add("Tablet", story, viewports.tablet);
stories.add("Phablet", story, viewports.phablet);
stories.add("Mobile", story, viewports.mobile);
