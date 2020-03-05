// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { PlayOkayBar } from "./PlayOkayBar";

const stories = storiesOf("PlayOkayBar", module);

const jurisdictions = ["MGA", "SGA", "DGA", "DGOJ"];

stories.add("Default", () => {
  const jurisdiction = select("Jurisdiction", jurisdictions, "MGA");

  return <PlayOkayBar jurisdiction={jurisdiction} />;
});
