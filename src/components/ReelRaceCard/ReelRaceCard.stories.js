// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
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
const timeOptions = {
  scheduled: {
    startTime: now + 30 * minute,
    endTime: now + 60 * minute,
  },
  ongoing: {
    startTime: now,
    endTime: now + 30 * minute,
  },
};

stories.add("Default", () => {
  const time = select("Time", ["scheduled", "ongoing"], "scheduled");
  const reelRace = {
    ...reelRaceMock,
    promoted: select("Promoted", [false, true], false),
    optedIn: select("Opted In", [false, true], false),
    startTime: timeOptions[time].startTime,
    endTime: timeOptions[time].endTime,
  };

  return (
    <div className="c-reel-race-card">
      <ReelRaceCard reelRace={reelRace} optIn={() => {}} />
    </div>
  );
});
