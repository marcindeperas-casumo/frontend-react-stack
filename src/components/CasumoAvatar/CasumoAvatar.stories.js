// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { CasumoAvatar } from "./CasumoAvatar";
import { belts } from "./beltUtils";

const stories = storiesOf("CasumoAvatar", module);

stories.add("Default", () => {
  const belt = select("Belt level", belts, belts[0]);
  const level = number("Level", 0, {
    range: true,
    min: 0,
    max: 180,
    step: 1,
  });
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
