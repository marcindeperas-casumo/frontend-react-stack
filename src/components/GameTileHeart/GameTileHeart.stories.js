// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { GameTileHeart } from "./GameTileHeart";

const stories = storiesOf("GameTileHeart", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => {
  return (
    <Flex align="center" justify="center" style={{ height: 300, width: 300 }}>
      <div className="t-color-red" style={{ width: 50, height: 50 }}>
        <GameTileHeart
          isActive={boolean("is active", false)}
          onClick={() => {}}
        />
      </div>
    </Flex>
  );
});
