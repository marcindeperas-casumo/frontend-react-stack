// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReelRaceLeaderboardModal } from "./ReelRaceLeaderboardModal";

const stories = storiesOf("RSModal/Slots/ReelRaceLeaderboardModal", module);

stories.add("Default", () => (
  <ReelRaceLeaderboardModal acceptModal={action("acceptModal")} />
));
