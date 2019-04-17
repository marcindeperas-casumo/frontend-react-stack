// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { number, text, select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import AdventureCard from "./AdventureCard";
import { belts } from "Components/CasumoAvatar/beltUtils";

const stories = storiesOf("AdventureCard", module);

stories.add(
  "Default",
  () => {
    const belt = select("Belt level", belts, belts[0]);

    const adventurer = {
      name: text("Name", "JohnnySumo"),
      level: number("Level", 12),
      points: number("Points", 100),
      pointsToNextMilestone: number("Points to next milestone", 1000),
      belt,
    };
    return <AdventureCard adventurer={adventurer} />;
  },
  info({ text: "Default" })
);
