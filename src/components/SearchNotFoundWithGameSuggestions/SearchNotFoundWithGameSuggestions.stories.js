// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";

const stories = storiesOf("SearchNotFoundWithGameSuggestions", module);

stories.add("Default", () => (
    {/* $FlowFixMe - __FIX__ pass in proper mocked properties here */}
    <SearchNotFoundWithGameSuggestions />
));
