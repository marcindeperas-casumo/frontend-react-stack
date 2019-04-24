// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import SportsTopBar, { hashes } from "./SportsTopBar";
import mocks from "./__mocks__/termMocks";

const stories = storiesOf("Sports/SportsTopBar", module);

stories.addDecorator(story => (
  <MockedProviderWithContext mocks={mocks} addTypename={false}>
    {story()}
  </MockedProviderWithContext>
));

stories.add(
  "Home Active",
  () => <SportsTopBar currentHash={hashes.home} />,
  info("Home Active")
);

stories.add(
  "Search Active",
  () => <SportsTopBar currentHash={hashes.home} isSearchVisible />,
  info("Search Active")
);

stories.add(
  "My Bets Active",
  () => <SportsTopBar currentHash={hashes.betHistory} />,
  info("My Bets Active")
);
