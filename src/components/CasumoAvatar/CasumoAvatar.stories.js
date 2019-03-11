// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import CasumoAvatar from "./CasumoAvatar";
import * as R from "ramda";

const stories = storiesOf("CasumoAvatar", module);

stories.add(
  "Default",
  () => {
    const beltLevels = R.times(R.identity, 8);
    const belt = select("Belt level", beltLevels, beltLevels[0]);

    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "80px" }}
      >
        <CasumoAvatar beltLevel={belt} />
      </div>
    );
  },
  info({ text: "Default" })
);
