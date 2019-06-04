// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SportsFooter } from "./SportsFooter";

const stories = storiesOf("Sports/SportsFooter", module);

stories.add("Default View", () => <SportsFooter />);
