// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { CasumoAvatar } from "./CasumoAvatar";
import { belts } from "./beltUtils";

const stories = storiesOf("CasumoAvatar", module);
const levels = Array.from(Array(180).keys()).map(value => value + 1);

stories.add("Default", () => {
  const belt = select("Belt level", belts, belts[0]);
  const backgroundColour = select(
    "Background Colour",
    ["teal", "yellow"],
    "teal"
  );
  const level = select("Level", levels, levels[0]);

  return (
    <div
      className="u-margin-left--auto u-margin-right--auto"
      style={{ maxWidth: "80px" }}
    >
      <CasumoAvatar
        backgroundColour={backgroundColour}
        belt={belt}
        level={level}
      />
    </div>
  );
});
