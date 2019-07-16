// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ScrollableListTopBar } from "./";

const stories = storiesOf("ScrollableListTopBar", module);

stories.add("Default", () => (
  <ScrollableListTopBar
    title="howdy! 🤠"
    seeMore={{ text: "This is a pretty link 💅🏼", url: "#" }}
  />
));
