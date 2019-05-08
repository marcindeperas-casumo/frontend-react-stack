// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import { GameListVertical } from "./";

const stories = storiesOf("GameListVertical", module);

stories.add(
  "Default",
  () => (
    <MockStore>
      <GameListVertical
        ids={[
          "hall-of-gods",
          "mega-moolah",
          "book-of-ra-deluxe-jackpot-edition",
        ]}
      />
    </MockStore>
  ),
  info({ text: "Default" })
);
