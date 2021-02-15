// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import MockStore from "Components/MockStore";
import { ReelRaceIcon } from "../ReelRaceIcon";

const stories = storiesOf("ReelRaceIconBooserPoints", module);

const getCurrentRace = (value = null) => ({
  position: value || 1,
  remainingSpins: value || 99,
  points: value || 42,
  startTime: Date.now() - 10000,
  endTime: Date.now() + 3000,
});

const playerId = "a1";
stories.add("Default", () => {
  const boosters = {
    bigWins: number("Big Wins", 0),
    megaWins: number("Mega Wins", 0),
    triples: number("Triples", 0),
    wins: number("Wins", 0),
  };

  const currentRace = getCurrentRace();
  currentRace.boosters = boosters;

  return (
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
            [playerId]: currentRace,
          },
        },
      }}
    >
      <div
        style={{
          boxSizing: "content-box",
        }}
      >
        <div
          className="t-background-blue-50 o-flex--horizontal o-flex-align--center o-flex-justify--start u-padding-x"
          style={{
            height: 48,
          }}
        >
          <ReelRaceIcon currentRace={currentRace} />
        </div>
      </div>
    </MockStore>
  );
});
