// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ValuableCard from "./";

const stories = storiesOf("ValuableCard", module);

stories.add("Default", () => <ValuableCard />, info({ text: "Default" }));
