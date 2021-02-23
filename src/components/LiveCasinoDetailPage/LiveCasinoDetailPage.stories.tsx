// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { groupedLiveCasinoGames } from "./__mocks__";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

if (isNotChromatic) {
  const stories = storiesOf("LiveCasinoDetailPage", module);
  stories.add("Default", () => (
    <LiveCasinoDetailPage groupedLiveCasinoGames={groupedLiveCasinoGames} />
  ));
}
