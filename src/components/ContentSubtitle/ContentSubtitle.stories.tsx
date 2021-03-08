import { storiesOf } from "@storybook/react";
import React from "react";
import { ContentSubtitle } from "./ContentSubtitle";

const stories = storiesOf("ContentSubtitle", module);

const subtitle = "Monday, 17 December";

stories.add("Default", () => <ContentSubtitle subtitle={subtitle} />);
