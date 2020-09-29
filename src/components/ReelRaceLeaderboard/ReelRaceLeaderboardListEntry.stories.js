// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
// import isNotChromatic from "Storybook/isNotChromatic";
// import MockStore from "Components/MockStore";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";
// import { leaderboard } from "./__mocks__/leaderboard.mock";

const stories = storiesOf(
  "ReelRaceLeaderboard/ReelRaceLeaderboardListEntry",
  module
);

stories.add("Default", () => {
  return (
    <div>
      <ReelRaceLeaderboardListEntry
        position={1}
        text="testme"
        price="$5"
        points={1}
        highlighted
      />
      <ReelRaceLeaderboardListEntry
        position={1}
        text="testme"
        price="$5"
        points={5}
      />
      <ReelRaceLeaderboardListEntry
        position={2}
        text="testme"
        price="$5"
        points={44}
      />
      <ReelRaceLeaderboardListEntry
        position={3}
        text="testme"
        price="$50"
        points={273}
      />
      <ReelRaceLeaderboardListEntry
        position={4}
        text="testme"
        price="$500"
        points={2739}
      />
    </div>
  );
});
