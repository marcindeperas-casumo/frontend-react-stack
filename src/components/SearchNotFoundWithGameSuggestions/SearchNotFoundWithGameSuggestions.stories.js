// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
// __FIX__ do we need this?
// import MockStore from "Components/MockStore";
import { SearchNotFoundWithGameSuggestions } from "./SearchNotFoundWithGameSuggestions";

const stories = storiesOf("SearchNotFoundWithGameSuggestions", module);

// {/* $FlowFixMe - __FIX__ pass in proper mocked properties here */}
stories.add("Default", () => <SearchNotFoundWithGameSuggestions />);
