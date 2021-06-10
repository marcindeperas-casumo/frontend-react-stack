import { MockedProvider } from "@apollo/client/testing";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import { SportsJackpots } from "./SportsJackpots";
import { mocks } from "./__mocks__/sportsJackpotsMock";

const stories = storiesOf("Sports/Jackpots", module);

// const baseProps = {
//   onResultClick: action("search result clicked"),
//   hideSearchResults: false,
// };

// const props = {
//   hasResults: { ...baseProps, query: "arse" },
//   noResults: { ...baseProps, query: "nothingtofind" },
//   notSearching: { ...baseProps, query: "" },
// };

stories.add("Default View", () => (
  <MockedProvider mocks={mocks}>
    <SportsJackpots />
  </MockedProvider>
));

// stories.add("No Search Results", () => (
//   <MockedProvider mocks={mocks.noResults} addTypename={false}>
//     <KambiSearchResults {...props.noResults} />
//   </MockedProvider>
// ));

// stories.add("Not Searching", () => (
//   <MockedProvider mocks={mocks.notSearching} addTypename={false}>
//     <KambiSearchResults {...props.notSearching} />
//   </MockedProvider>
// ));
