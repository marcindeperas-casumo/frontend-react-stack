// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { LaurelPosition } from "./LaurelPosition";

const stories = storiesOf("ReelRaceLeaderboard/LaurelPosition", module);

stories.add("Default", () => {
  return (
    <div>
      <h2>With laurel</h2>
      <h3>Highlighted</h3>
      <LaurelPosition position={1} highlighted showLaurel />
      <LaurelPosition position={2} highlighted showLaurel />
      <LaurelPosition position={3} highlighted showLaurel />
      <LaurelPosition position={4} highlighted showLaurel />
      <LaurelPosition position={10} highlighted showLaurel />
      <LaurelPosition position={50} highlighted showLaurel />
      <LaurelPosition position={100} highlighted showLaurel />
      <h3>Not highlighted</h3>
      <LaurelPosition position={1} showLaurel />
      <LaurelPosition position={2} showLaurel />
      <LaurelPosition position={3} showLaurel />
      <LaurelPosition position={4} showLaurel />
      <LaurelPosition position={10} showLaurel />
      <LaurelPosition position={50} showLaurel />
      <LaurelPosition position={100} showLaurel />
      <h2>Without laurel</h2>
      <h3>Highlighted</h3>
      <LaurelPosition position={1} highlighted />
      <LaurelPosition position={2} highlighted />
      <LaurelPosition position={3} highlighted />
      <LaurelPosition position={4} highlighted />
      <LaurelPosition position={10} highlighted />
      <LaurelPosition position={50} highlighted />
      <LaurelPosition position={100} highlighted />
      <h3>Not highlighted</h3>
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
