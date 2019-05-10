// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameRowSkeleton } from "./";

const stories = storiesOf("GameRowSkeleton", module);

stories.add("Default", () => <GameRowSkeleton />);
