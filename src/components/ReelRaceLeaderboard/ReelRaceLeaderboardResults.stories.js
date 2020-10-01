// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
// import isNotChromatic from "Storybook/isNotChromatic";
// import MockStore from "Components/MockStore";
import { ReelRaceLeaderboardResults } from "./ReelRaceLeaderboardResults";
import { leaderboard } from "./__mocks__/leaderboard.mock";
import { prices } from "./__mocks__/prices.mock";

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
        prices={prices}
      />
    </div>
  );
});
