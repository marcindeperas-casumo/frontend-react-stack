// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { GameRowSkeleton } from "./";

const stories = storiesOf("GameRowSkeleton", module);

stories.add("Default", () => <GameRowSkeleton />, info({ text: "Default" }));
