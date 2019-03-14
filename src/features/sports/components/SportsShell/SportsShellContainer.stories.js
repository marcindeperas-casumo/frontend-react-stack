// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import { SportsShellContainer } from "./SportsShellContainer";
import { getQueryMocks } from "./__mocks__/sportsShellQuery";
import type { MockResult } from "./__mocks__/sportsShellQuery";

const stories = storiesOf("Sports/SportsShellContainer", module);

const renderForMocks = (mockResult: MockResult) => () => (
  <MockedProviderWithContext
    mocks={getQueryMocks(mockResult)}
    addTypename={false}
  >
    <SportsShellContainer />
  </MockedProviderWithContext>
);

stories.add(
  "Default View (first launch)",
  renderForMocks({
    data: {
      hasSelectedFavourites: false,
      searchVisible: false,
    },
  }),
  info("Default View (first launch)")
);

// stories.add(
//   "Default View (favourites selected)",
//   () => <SportsShellContainer />,
//   info("Default View")
// );

// stories.add(
//   "Search View",
//   () => <SportsShellContainer />,
//   info("Default View")
// );

// stories.add(
//   "Loading View",
//   () => <SportsShellContainer />,
//   info("Default View")
// );

// stories.add("Error View", () => <SportsShellContainer />, info("Default View"));
