// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";

const stories = storiesOf("SearchNotFoundWithGameSuggestions", module);

stories.add("Default", () => (
  <MockStore>
    <SearchNotFoundWithGameSuggestions />
  </MockStore>
));
