// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import SportsNav from "./SportsNav";
import mocks from "./__mocks__/userNavigationQuery";

const stories = storiesOf("Sports/SportsNav", module);

stories.add(
  "Multiple sports",
  () => (
    <MockedProviderWithContext mocks={mocks.multipleSports} addTypename={false}>
      <SportsNav currentHash="#filter/football/champions_league" />
    </MockedProviderWithContext>
  ),
  info({ text: "Multiple sports" })
);

stories.add(
  "Single sport",
  () => (
    <MockedProviderWithContext mocks={mocks.singleSport} addTypename={false}>
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProviderWithContext>
  ),
  info({ text: "Single sport" })
);

stories.add(
  "Error",
  () => (
    <MockedProviderWithContext mocks={mocks.error} addTypename={false}>
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProviderWithContext>
  ),
  info({ text: "Single sport" })
);
