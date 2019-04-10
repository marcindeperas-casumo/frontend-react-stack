// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import Valuable from "./Valuable";

const stories = storiesOf("Valuable", module);

stories.add("Default", () => <Valuable />, info({ text: "Default" }));
