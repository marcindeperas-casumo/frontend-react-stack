import { storiesOf } from "@storybook/react";
import React from "react";
// import { viewports } from "Storybook/viewports";

const viewports = { mobile: null, desktop: null, tablet: null, phablet: null };
import MockStore from "Components/MockStore";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRacesDrawerWidget } from "./ReelRacesDrawerWidget";

const stories = storiesOf("ReelRaceDrawer", module);

const getCurrentRace = (value: number = null) => ({
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
  t: {
    reel_races_drawer_pts: "pts",
    reel_races_drawer_points: "points",
    reel_races_drawer_spins: "spins",
    reel_races_drawer_full_leaderboard: "full leaderboard",
  },
  currentRace: {
    startTime: Date.now(),
    endTime: Date.now() + 30 * 60 * 1000,
  },
};

const playerId = "one";

const WrapperDesktop = ({ children, ...rest }) => (
  <Wrapper>
    <SidebarElementWrapper {...rest}>{children}</SidebarElementWrapper>
  </Wrapper>
);

const Wrapper = ({ children }) => (
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
    <>{children}</>
  </MockStore>
);

const WithLeaderboard = () => {
  const [lb, setLb] = React.useState(false);

  return (
    <div>
      <WrapperDesktop>
        <ReelRacesDrawerWidget
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
    <ReelRacesDrawerWidget {...props} />
  </Wrapper>
);

const storyDesktop = () => (
  <Wrapper>
    <ReelRacesDrawerWidget {...props} />
    <br />
    <br />
    <WrapperDesktop>
      <ReelRacesDrawerWidget {...props} />
    </WrapperDesktop>
    <br />
    <br />
    <WrapperDesktop pinnable>
      <ReelRacesDrawerWidget {...props} />
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
