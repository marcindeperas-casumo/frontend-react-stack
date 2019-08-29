// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
// import MockDate from "mockdate";
// import { isChromatic } from "Storybook/isNotChromatic";
import { ReelRaceWidget } from "./ReelRaceWidget";

const stories = storiesOf("ReelRaceCard", module);

const props = {
  initReelRaceWidget: () => {},
};

stories.add("Default", () => {
  return (
    <div>
      <ReelRaceWidget {...props} />
    </div>
  );
});
