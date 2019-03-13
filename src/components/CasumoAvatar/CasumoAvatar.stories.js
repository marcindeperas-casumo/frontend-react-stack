// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { CasumoAvatar } from "./CasumoAvatar";
import { belts } from "./beltUtils";

const stories = storiesOf("CasumoAvatar", module);

stories.add(
  "Default",
  () => {
    const belt = select("Belt level", belts, belts[0]);

    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "80px" }}
      >
        <CasumoAvatar belt={belt} />
      </div>
    );
  },
  info({ text: "Default" })
);
