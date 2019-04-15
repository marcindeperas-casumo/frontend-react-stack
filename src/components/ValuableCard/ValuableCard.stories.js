// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import ValuableCard from "./";

const stories = storiesOf("ValuableCard", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => <ValuableCard />, info({ text: "Default" }));
