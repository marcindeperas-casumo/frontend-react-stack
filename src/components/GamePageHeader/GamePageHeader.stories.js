// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { GamePageHeader } from "./GamePageHeader";

const stories = storiesOf("GamePageHeader", module);

stories.add("Game Page Header", () => {
  return (
    <MockStore>
      <GamePageHeader />
    </MockStore>
  );
});
