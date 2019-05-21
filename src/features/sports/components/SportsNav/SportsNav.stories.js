// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import SportsNav from "./SportsNav";
import mocks from "./__mocks__/userNavigationQuery";

const stories = storiesOf("Sports/SportsNav", module);

stories.add("Many sports (desktop)", () => (
  <div className="c-sports-shell--site">
    <MockedProviderWithContext mocks={mocks.manySports} addTypename={false}>
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProviderWithContext>
  </div>
));

stories.add("Many sports", () => (
  <MockedProviderWithContext mocks={mocks.manySports} addTypename={false}>
    <SportsNav currentHash="#filter/tennis/wta" />
  </MockedProviderWithContext>
));

stories.add("Multiple sports", () => (
  <MockedProviderWithContext mocks={mocks.multipleSports} addTypename={false}>
    <SportsNav currentHash="#filter/football/champions_league" />
  </MockedProviderWithContext>
));

stories.add("Single sport", () => (
  <MockedProviderWithContext mocks={mocks.singleSport} addTypename={false}>
    <SportsNav currentHash="#filter/tennis/wta" />
  </MockedProviderWithContext>
));

stories.add("Error", () => (
  <MockedProviderWithContext mocks={mocks.error} addTypename={false}>
    <SportsNav currentHash="#filter/tennis/wta" />
  </MockedProviderWithContext>
));
