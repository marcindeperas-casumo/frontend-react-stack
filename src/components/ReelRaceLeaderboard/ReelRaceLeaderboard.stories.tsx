// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { ReelRaceLeaderboard } from "./ReelRaceLeaderboard";
import { leaderboard } from "./__mocks__/leaderboard.mock";

const stories = storiesOf("ReelRaceLeaderboard/ReelRaceLeaderboard", module);

const props = {
  cometdChannels: ["channel1", "channel2"],
  id: "123",
  t: {
    spins: "Spins",
    ending_in: "Starting in",
  },
  endTime: 1576698600000,
  initialLeaderboard: leaderboard,
};

if (isNotChromatic) {
  stories.add("Default", () => {
    return (
      <MockStore>
        <div style={{ width: "300px" }}>
          <ReelRaceLeaderboard {...props} />
        </div>
      </MockStore>
    );
  });
}
