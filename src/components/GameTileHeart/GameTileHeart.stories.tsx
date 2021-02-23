// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { GameTileHeart } from "./GameTileHeart";
import styles from "./GameTileHeart.scss";

const stories = storiesOf("GameTileHeart", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => (
  <div className="t-color-red-30" style={{ width: 50, height: 50 }}>
    <GameTileHeart isActive={boolean("is active", false)} onClick={() => {}} />
  </div>
));

stories.add(
  "Active",
  () => (
    <div className="t-color-red-30" style={{ width: 50, height: 50 }}>
      <GameTileHeart isActive={true} onClick={() => {}} />
    </div>
  ),
  {
    chromatic: {
      delay: parseInt(styles.heartAnimationDuration),
      pauseAnimationAtEnd: true,
    },
  }
);
