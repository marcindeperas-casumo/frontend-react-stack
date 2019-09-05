// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import KambiSearchResults from "./KambiSearchResults";
import mocks from "./__mocks__/kambiSearchResultsMocks";

const stories = storiesOf("Sports/KambiSearchResults", module);

const baseProps = {
  onResultClick: action("search result clicked"),
  hideSearchResults: false,
};

const props = {
  hasResults: { ...baseProps, query: "arse" },
  noResults: { ...baseProps, query: "nothingtofind" },
  notSearching: { ...baseProps, query: "" },
};

stories.add("Search Results", () => (
  <MockedProviderWithContext mocks={mocks.hasResults} addTypename={false}>
    <KambiSearchResults {...props.hasResults} />
  </MockedProviderWithContext>
));

stories.add("No Search Results", () => (
  <MockedProviderWithContext mocks={mocks.noResults} addTypename={false}>
    <KambiSearchResults {...props.noResults} />
  </MockedProviderWithContext>
));

stories.add("Not Searching", () => (
  <MockedProviderWithContext mocks={mocks.notSearching} addTypename={false}>
    <KambiSearchResults {...props.notSearching} />
  </MockedProviderWithContext>
));
