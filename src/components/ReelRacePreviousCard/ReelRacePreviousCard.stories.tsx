import { storiesOf } from "@storybook/react";
import React from "react";
import { ReelRacePreviousCard } from "./ReelRacePreviousCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import { t } from "./__mocks__/t";

const stories = storiesOf("ReelRacePreviousCard", module);

stories.add("Default", () => {
  return (
    <div className="c-reel-race-card">
      <ReelRacePreviousCard reelRace={reelRaceMock} t={t} />
    </div>
  );
});

stories.add("Expanded", () => {
  return (
    <div className="c-reel-race-card">
      <ReelRacePreviousCard reelRace={reelRaceMock} t={t} expanded />
    </div>
  );
});
