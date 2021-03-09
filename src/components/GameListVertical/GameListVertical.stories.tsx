import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import React from "react";
import { GameListVertical } from "./GameListVertical";
import { games } from "./__mock__";

const stories = storiesOf("GameListVertical", module);

stories.add("Default", () => {
  const loading = boolean("Is Loading", false);
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: boolean; backgroundImage:... Remove this comment to see the full error message
  return <GameListVertical games={games} loading={loading} />;
});
