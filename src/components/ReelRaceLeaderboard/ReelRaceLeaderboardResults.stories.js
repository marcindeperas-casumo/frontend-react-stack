// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRaceLeaderboardResults } from "./ReelRaceLeaderboardResults";
import { leaderboard, boosters } from "./__mocks__/leaderboard.mock";
import { prizes } from "./__mocks__/prizes.mock";

const stories = storiesOf(
  "ReelRaceLeaderboard/ReelRaceLeaderboardResults",
  module
);

stories.add("Default", () => {
  return (
    <div>
      <ReelRaceLeaderboardResults
        leaderboard={leaderboard}
        playerId="777"
        prizes={prizes}
      />
    </div>
  );
});

const extraLeaderboard = [
  {
    playerId: "1000",
    playerName: "p0",
    position: 100,
    points: 100,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "1001",
    playerName: "p1",
    position: 101,
    points: 100,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "1002",
    playerName: "p2",
    position: 102,
    points: 100,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "1003",
    playerName: "p3",
    position: 103,
    points: 100,
    remainingSpins: 250,
    boosters,
  },
];

const SimulateLeaderboard = () => {
  const [lb, setLb] = React.useState([...leaderboard, ...extraLeaderboard]);

  React.useEffect(() => {
    setTimeout(() => {
      setLb(s =>
        s.map(x => (x.playerId === "1002" ? { ...x, position: 36 } : x))
      );
    }, 4000);
  }, []);

  return (
    <SidebarElementWrapper>
      <ReelRaceLeaderboardResults
        leaderboard={lb}
        playerId="1002"
        forceLaurelPositions={3}
        style={{ height: "250px" }}
        className="t-opacity-background-100 t-background-black"
        rowClassName="t-opacity-background-100 t-background-black"
        inverted
        fixedRows={2}
      />
    </SidebarElementWrapper>
  );
};

stories.add("Drawer", () => {
  return <SimulateLeaderboard />;
});
