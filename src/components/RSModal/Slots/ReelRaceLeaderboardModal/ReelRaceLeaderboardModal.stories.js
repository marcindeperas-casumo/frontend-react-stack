// @flow
import * as React from "react";
import * as R from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { leaderboard } from "Components/ReelRaceLeaderboard/__mocks__/leaderboard.mock";
import { prizes } from "Components/ReelRaceLeaderboard/__mocks__/prizes.mock";
import { ReelRaceLeaderboardModal } from "./ReelRaceLeaderboardModal";

const stories = storiesOf(
  "RSModal/Slots/ReelRaceLeaderboardModal",
  module
).addParameters({ noGlobalDecorator: true });

const furtherEntry = R.find(R.propEq("position", 57), leaderboard);

stories.add("Someone won the race", () => {
  return (
    <ReelRaceLeaderboardModal
      acceptModal={action("acceptModal")}
      config={{
        input: {
          playerId: "player-123",
          playerName: "Player",
          position: 100,
          points: 0,
          leaderboard: [...leaderboard, ...R.repeat(furtherEntry, 10)],
          prizes,
        },
      }}
    />
  );
});

stories.add("Player won the race", () => {
  const position = 1;
  const { playerId, playerName, points } = R.find(
    R.propEq("position", position),
    leaderboard
  );

  return (
    <ReelRaceLeaderboardModal
      acceptModal={action("acceptModal")}
      config={{
        input: {
          playerId,
          playerName,
          position,
          points,
          leaderboard,
          prizes,
        },
      }}
    />
  );
});

stories.add("Player scored 3rd", () => {
  const position = 3;
  const { playerId, playerName, points } = R.find(
    R.propEq("position", position),
    leaderboard
  );

  return (
    <ReelRaceLeaderboardModal
      acceptModal={action("acceptModal")}
      config={{
        input: {
          playerId,
          playerName,
          position,
          points,
          leaderboard,
          prizes,
        },
      }}
    />
  );
});
