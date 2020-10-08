// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRaceLeaderboardResults } from "./ReelRaceLeaderboardResults";
import { leaderboard } from "./__mocks__/leaderboard.mock";
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

stories.add("Drawer", () => {
  return (
    <SidebarElementWrapper>
      <ReelRaceLeaderboardResults
        leaderboard={leaderboard}
        playerId="777"
        forceLaurelPositions={3}
        className="t-opacity-background-100 t-background-black u-height--5xlg"
        rowClassName="t-opacity-background-100 t-background-black"
        inverted
        fixedRows={2}
      />
    </SidebarElementWrapper>
  );
});
