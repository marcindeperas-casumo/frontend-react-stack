// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { ReelRaceLeaderboardWidget } from "./ReelRaceLeaderboardWidget";

const stories = storiesOf("ReelRaceLeaderboardWidget", module);

const boosters = {
  triples: 0,
  bigWins: 0,
  megaWins: 0,
};
const leaderboard = [
  {
    playerId: "101112",
    playerName: "Goldofunky",
    position: 1,
    points: 2345,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "888",
    playerName: "Regalao",
    position: 58,
    points: 8,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "777",
    playerName: "OtroVesino",
    position: 57,
    points: 100,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "123",
    playerName: "Vesino",
    position: 59,
    points: 0,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "456",
    playerName: "Caramustia",
    position: 2,
    points: 1098,
    remainingSpins: 250,
    boosters,
  },
  {
    playerId: "789",
    playerName: "Sisiento",
    position: 3,
    points: 600,
    remainingSpins: 250,
    boosters,
  },
];

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
        <ReelRaceLeaderboardWidget {...props} />
      </div>
    );
  });
}
