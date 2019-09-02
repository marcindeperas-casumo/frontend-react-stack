// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { CasumoAvatar } from "./CasumoAvatar";
import { belts } from "./beltUtils";

const stories = storiesOf("CasumoAvatar", module);
const levels = Array.from(Array(180).keys()).map(value => value + 1);

stories.add("Default", () => {
  const belt = select("Belt level", belts, belts[0]);
  const level = number("Level", levels[0]);
  const inBonusMode = boolean("In bonus mode", false);

  return (
    <div
      className="u-margin-left--auto u-margin-right--auto"
      style={{ maxWidth: "80px" }}
    >
      <CasumoAvatar inBonusMode={inBonusMode} belt={belt} level={level} />
    </div>
  );
});
