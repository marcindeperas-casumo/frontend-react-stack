// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ContentSeparator } from "./ContentSeparator";

const stories = storiesOf("ContentSeparator", module);

stories.add("Default", () => <ContentSeparator />);
