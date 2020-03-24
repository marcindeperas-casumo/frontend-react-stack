// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameDetails } from "./GameDetails";

const stories = storiesOf("GameDetails", module);

stories.add("Default", () => <GameDetails msg="howdy! 🤠" />);
