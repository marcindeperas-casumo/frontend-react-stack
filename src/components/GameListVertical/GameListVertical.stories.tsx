// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { GameListVertical } from "./GameListVertical";
import { games } from "./__mock__";

const stories = storiesOf("GameListVertical", module);

stories.add("Default", () => {
  const loading = boolean("Is Loading", false);
  return <GameListVertical games={games} loading={loading} />;
});
