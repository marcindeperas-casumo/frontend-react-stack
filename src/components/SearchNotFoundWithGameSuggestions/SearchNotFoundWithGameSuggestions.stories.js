// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SearchNotFoundWithGameSuggestions } from "Components/SearchNotFoundWithGameSuggestions/SearchNotFoundWithGameSuggestions";

const stories = storiesOf("SearchNotFoundWithGameSuggestions", module);

stories.add("Default", () => <SearchNotFoundWithGameSuggestions />);
