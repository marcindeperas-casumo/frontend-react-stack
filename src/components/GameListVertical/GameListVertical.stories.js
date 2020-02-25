// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameListVertical } from "./GameListVertical";
import { games } from "./__mock__";

const stories = storiesOf("GameListVertical", module);

stories.add("Default", () => <GameListVertical games={games} />);
