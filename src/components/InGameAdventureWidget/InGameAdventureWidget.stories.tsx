import { storiesOf } from "@storybook/react";
import * as React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { InGameAdventureWidget } from "./InGameAdventureWidget";

const stories = storiesOf("InGameAdventureWidget", module);

if (isNotChromatic) {
  stories.add("User has yellow belt and level 11", () => {
    return (
      <InGameAdventureWidget
        belt="yellow"
        level={11}
        points={4000}
        progressPercentage={80}
        pointsRequiredForNextLevel={500}
      />
    );
  });

  stories.add("User has black belt, level 180 and is in travel mode", () => {
    return (
      <>
        Getting rewards instead of levels up:
        <InGameAdventureWidget
          belt="black"
          level={180}
          points={20000}
          progressPercentage={80}
          pointsRequiredForNextLevel={500}
          inBonusMode
        />
      </>
    );
  });
}
