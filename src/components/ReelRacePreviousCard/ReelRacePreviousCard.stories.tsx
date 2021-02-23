// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRacePreviousCard } from "./ReelRacePreviousCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import tMock from "./__mocks__/t.json";

const stories = storiesOf("ReelRacePreviousCard", module);

stories.add("Default", () => {
  return (
    <div className="c-reel-race-card">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; game: { id: string; name: stri... Remove this comment to see the full error message */}
      <ReelRacePreviousCard reelRace={reelRaceMock} t={tMock} />
    </div>
  );
});

stories.add("Expanded", () => {
  return (
    <div className="c-reel-race-card">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; game: { id: string; name: stri... Remove this comment to see the full error message */}
      <ReelRacePreviousCard reelRace={reelRaceMock} t={tMock} expanded={true} />
    </div>
  );
});
