import React from "react";
import { storiesOf } from "@storybook/react";

import info from "../../../.storybook/storybookInfo";

import GamesLists from "./";

const stories = storiesOf("GamesLists", module);

stories.add(
  "Default",
  () => <GamesLists listIds={["list-1", "list-2"]} />,
  info({ text: "Default" })
);
