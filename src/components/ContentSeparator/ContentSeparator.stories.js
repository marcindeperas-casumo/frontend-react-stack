import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContentSeparator from "./ContentSeparator";

const stories = storiesOf("ContentSeparator", module);

stories.add("Default", () => <ContentSeparator />, info({ text: "Default" }));
