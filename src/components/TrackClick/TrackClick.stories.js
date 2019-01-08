// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TrackClick from "./";

const stories = storiesOf("TrackClick", module);

stories.add("Default", () => <TrackClick />, info({ text: "Default" }));
