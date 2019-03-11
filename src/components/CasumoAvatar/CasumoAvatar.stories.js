// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import CasumoAvatar from "./CasumoAvatar";

const stories = storiesOf("CasumoAvatar", module);

stories.add(
  "Default",
  () => {
    const belts = {
      rope: "brown-light-2",
      white: "grey-light-1",
      yellow: "yellow",
      red: "red",
      blue: "blue",
      purple: "purple",
      black: "black",
      sensei: "black",
    };
    const belt = select("Belt level", belts, belts["rope"]);

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
