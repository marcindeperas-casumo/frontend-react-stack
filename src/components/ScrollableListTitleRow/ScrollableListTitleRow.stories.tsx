import { storiesOf } from "@storybook/react";
import React from "react";
import { ScrollableListTitleRow } from "./";

const stories = storiesOf("ScrollableListTitleRow", module);

stories.add("Default", () => (
  <ScrollableListTitleRow
    title="howdy! 🤠"
    seeMore={{ text: "This is a pretty link 💅🏼", url: "#" }}
  />
));
