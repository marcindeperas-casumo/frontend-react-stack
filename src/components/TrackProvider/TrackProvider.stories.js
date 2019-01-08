// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import TrackProvider from "./";

const stories = storiesOf("TrackProvider", module);

stories.add("Default", () => <TrackProvider />, info({ text: "Default" }));
