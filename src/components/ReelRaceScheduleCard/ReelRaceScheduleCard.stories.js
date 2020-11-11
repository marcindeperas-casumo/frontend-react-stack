// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import tMock from "./__mocks__/t.json";

const stories = storiesOf("ReelRaceScheduleCard", module);

stories.add("Default", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        <ReelRaceScheduleCard reelRace={reelRaceMock} t={tMock} />
      </div>
    </MockStore>
  );
});

stories.add("Expanded", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        <ReelRaceScheduleCard
          reelRace={reelRaceMock}
          t={tMock}
          expanded={true}
        />
      </div>
    </MockStore>
  );
});

const promotedReelRace = {
  ...reelRaceMock,
  promoted: true,
};

stories.add("Promoted", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        <ReelRaceScheduleCard
          reelRace={promotedReelRace}
          t={tMock}
          expanded={true}
        />
      </div>
    </MockStore>
  );
});
