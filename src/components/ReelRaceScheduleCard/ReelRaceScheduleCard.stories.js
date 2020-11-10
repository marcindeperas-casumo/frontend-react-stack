// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import tMock from "./__mocks__/t.json";

const stories = storiesOf("ReelRaceScheduleCard", module);

stories.add("Default", () => {
  return (
    <div className="u-content-width--tablet-landscape">
      <ReelRaceScheduleCard reelRace={reelRaceMock} t={tMock} />
    </div>
  );
});

stories.add("Expanded", () => {
  return (
    <div className="u-content-width--tablet-landscape">
      <ReelRaceScheduleCard reelRace={reelRaceMock} t={tMock} expanded={true} />
    </div>
  );
});

const promotedReelRace = {
  ...reelRaceMock,
  promoted: true,
};

stories.add("Promoted", () => {
  return (
    <div className="u-content-width--tablet-landscape">
      <ReelRaceScheduleCard
        reelRace={promotedReelRace}
        t={tMock}
        expanded={true}
      />
    </div>
  );
});
