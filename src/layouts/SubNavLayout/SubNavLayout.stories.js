// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SubNavLayout } from "Layouts/SubNavLayout";

const stories = storiesOf("SubNavLayout", module);

const subNavLinks = [
  {
    to: "/casino/games",
    text: "Games",
  },
  {
    to: "/casino/races",
    text: "Races",
  },
];

stories.add("Default", () => <SubNavLayout links={subNavLinks} />);