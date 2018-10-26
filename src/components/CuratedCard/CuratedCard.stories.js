import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import CuratedCard from "./CuratedCard";

import curatedGameMock from "./__mocks__/curatedGame.json";

const stories = storiesOf("CuratedGame", module);

stories.add(
  "Default",
  () => {
    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "686px" }}
      >
        <CuratedCard data={curatedGameMock} />
      </div>
    );
  },
  info({ text: "Default" })
);
