import { storiesOf } from "@storybook/react";
import { withKnobs, select, number, boolean } from "@storybook/addon-knobs";
import React from "react";
import type { BeltType } from "Models/adventure";
import { CasumoAvatar } from "./CasumoAvatar";
import { belts } from "./beltUtils";

const stories = storiesOf("CasumoAvatar", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => {
  const belt = select("Belt level", belts, belts[0]);
  const level = number("Level", 0, {
    range: true,
    min: 0,
    max: 180,
    step: 1,
  });
  const inBonusMode = boolean("In bonus mode", false);
  const variant = select("Variant", ["default", "sm"], "default");

  return (
    <div
      className="u-margin-left--auto u-margin-right--auto"
      style={{ maxWidth: "80px" }}
    >
      <CasumoAvatar
        inBonusMode={inBonusMode}
        belt={belt as BeltType}
        level={level}
        variant={variant}
      />
    </div>
  );
});
