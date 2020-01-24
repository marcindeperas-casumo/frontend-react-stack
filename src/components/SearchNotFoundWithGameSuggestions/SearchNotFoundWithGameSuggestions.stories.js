// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SearchNotFoundWithGameSuggestions } from "./";

const stories = storiesOf("GameSearchNotFound", module);

stories.add("Default", () => (
  <SearchNotFoundWithGameSuggestions msg="howdy! 🤠" />
));
