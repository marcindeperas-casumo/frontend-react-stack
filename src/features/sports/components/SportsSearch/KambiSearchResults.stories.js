// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import KambiSearchResults from "./KambiSearchResults";
import mocks from "./__mocks__/kambiSearchResultsMocks";

const stories = storiesOf("Sports/KambiSearchResults", module);

const props = {
  query: "arse",
  onResultClick: action("search result clicked"),
  hideSearchResults: false,
};

const props2 = { ...props, query: "abcd" };

const props3 = { ...props, query: "" };

stories.add(
  "Search Results",
  () => (
    <MockedProviderWithContext mocks={mocks.hasResults} addTypename={false}>
      <KambiSearchResults {...props} />
    </MockedProviderWithContext>
  ),
  info({ text: "Search Results" })
);

stories.add(
  "No Search Results",
  () => (
    <MockedProviderWithContext mocks={mocks.noResults} addTypename={false}>
      <KambiSearchResults {...props2} />
    </MockedProviderWithContext>
  ),
  info({ text: "No Search Results" })
);

stories.add(
  "Not Searching",
  () => (
    <MockedProviderWithContext mocks={mocks.notSearching} addTypename={false}>
      <KambiSearchResults {...props3} />
    </MockedProviderWithContext>
  ),
  info({ text: "Not Searching" })
);

// not-searching: popular/recent
// searching: has results
// searching: no results
