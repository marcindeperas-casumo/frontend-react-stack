import { storiesOf } from "@storybook/react";
import React from "react";
import { ContentSeparator } from "./ContentSeparator";

const stories = storiesOf("ContentSeparator", module);

stories.add("Default", () => <ContentSeparator />);
