// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { ReelRaceLeaderboard } from "./ReelRaceLeaderboard";
import { leaderboard } from "./__mocks__/leaderboard.mock";

const stories = storiesOf("ReelRaceLeaderboard", module);

const props = {
  leaderboard,
  subscribeUpdates: () => {},
  unsubscribeUpdates: () => {},
  playerId: "123",
  playerBoosters: {
    triples: 3,
    bigWins: 10,
    megaWins: 1,
  },
  tournamentId: "123",
};

if (isNotChromatic) {
  stories.add("Default", () => {
    return (
      <div style={{ width: "300px" }}>
        <ReelRaceLeaderboard {...props} />
      </div>
    );
  });
}
