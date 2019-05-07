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
    const backgroundColour = select(
      "Background Colour",
      ["teal", "yellow"],
      "teal"
    );

    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "80px" }}
      >
        <CasumoAvatar
          belt={belt}
          backgroundColour={backgroundColour}
          level={1}
        />
      </div>
    );
  },
  info({ text: "Default" })
);
