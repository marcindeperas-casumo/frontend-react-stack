// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { LaurelPosition } from "./LaurelPosition";

const stories = storiesOf("ReelRaceLeaderboard/LaurelPosition", module);

stories.add("Default", () => {
  return (
    <div>
      <LaurelPosition position={1} highlighted />
      <LaurelPosition position={2} highlighted />
      <LaurelPosition position={3} highlighted />
      <LaurelPosition position={4} highlighted />
      <LaurelPosition position={10} highlighted />
      <LaurelPosition position={50} highlighted />
      <LaurelPosition position={100} highlighted />
      <LaurelPosition position={1} />
      <LaurelPosition position={2} />
      <LaurelPosition position={3} />
      <LaurelPosition position={4} />
      <LaurelPosition position={10} />
      <LaurelPosition position={50} />
      <LaurelPosition position={100} />
    </div>
  );
});
