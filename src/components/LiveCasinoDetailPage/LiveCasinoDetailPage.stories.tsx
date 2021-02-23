// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { groupedLiveCasinoGames } from "./__mocks__";
import { LiveCasinoDetailPage } from "./LiveCasinoDetailPage";

if (isNotChromatic) {
  const stories = storiesOf("LiveCasinoDetailPage", module);
  stories.add("Default", () => (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ title: string; games: { id: string; backgr... Remove this comment to see the full error message
    <LiveCasinoDetailPage groupedLiveCasinoGames={groupedLiveCasinoGames} />
  ));
}
