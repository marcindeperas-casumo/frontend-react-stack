// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, boolean } from "@storybook/addon-knobs/react";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { ReelRaceCard } from "./ReelRaceCard";
import { reelRaceMock } from "./__mocks__";

if (isChromatic) {
  MockDate.set(new Date().toString());
}

const stories = storiesOf("ReelRaceCard", module);

const minute = 60 * 1000;

const now = Date.now();
const startTime = now + 30 * minute;
const endTime = now + 60 * minute;

stories.add("Default", () => {
  const status = select("Status", ["Scheduled", "Started"], "Scheduled");
  const reelRace = {
    ...reelRaceMock,
    promoted: select("Promoted", [false, true], false),
    optedIn: select("Opted In", [false, true], false),
    status,
    startTime,
    endTime,
  };

  return (
    <div className="c-reel-race-card">
      <ReelRaceCard
        reelRace={reelRace}
        optIn={() => {}}
        locale="en"
        loading={boolean("Loading", false)}
      />
    </div>
  );
});
