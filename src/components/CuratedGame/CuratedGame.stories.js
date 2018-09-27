import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import CuratedGame from "./CuratedGame";

import curatedGameMock from "./__mocks__/curatedGame.json";

const stories = storiesOf("CuratedGame", module);
stories.addDecorator(withKnobs);

stories.add(
  "Default",
  () => {
    return <CuratedGame data={curatedGameMock} />;
  },
  info({ text: "Default" })
);
