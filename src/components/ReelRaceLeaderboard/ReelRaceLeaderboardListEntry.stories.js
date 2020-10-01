// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

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
        prize="$5"
        points={1}
        highlighted
      />
      <ReelRaceLeaderboardListEntry
        position={1}
        text="testme"
        prize="$5"
        points={5}
      />
      <ReelRaceLeaderboardListEntry
        position={2}
        text="testme"
        prize="$5"
        points={44}
      />
      <ReelRaceLeaderboardListEntry
        position={3}
        text="testme"
        prize="$50"
        points={273}
      />
      <ReelRaceLeaderboardListEntry
        position={4}
        text="testme"
        prize="$500"
        points={2739}
      />
      <ReelRaceLeaderboardListEntry position={5} text="testme" points={273} />
      <ReelRaceLeaderboardListEntry position={6} text="testme" points={2739} />
      <ReelRaceLeaderboardListEntry position={25} text="testme" points={2739} />
      <ReelRaceLeaderboardListEntry
        position={100}
        text="testme"
        points={2739}
      />
    </div>
  );
});
