// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import { SportsNav } from "Features/sports/components/SportsNav";
import * as mocks from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";

const stories = storiesOf("Sports/SportsNav", module);

const waitForScrollablePaginated = { chromatic: { delay: 200 } };

if (isNotChromatic) {
  stories.add(
    "Many sports (desktop)",
    () => (
      <div className="c-sports-shell--site">
        <MockedProviderWithContext mocks={mocks.manySports} addTypename={false}>
          <SportsNav currentHash="#filter/tennis/wta" />
        </MockedProviderWithContext>
      </div>
    ),
    waitForScrollablePaginated
  );

  stories.add(
    "Many sports",
    () => (
      <MockedProviderWithContext mocks={mocks.manySports} addTypename={false}>
        <SportsNav currentHash="#filter/tennis/wta" />
      </MockedProviderWithContext>
    ),
    waitForScrollablePaginated
  );
}

stories.add(
  "Multiple sports",
  () => (
    <MockedProviderWithContext mocks={mocks.multipleSports} addTypename={false}>
      <SportsNav currentHash="#filter/football/england/premier_league" />
    </MockedProviderWithContext>
  ),
  waitForScrollablePaginated
);

stories.add("Single sport", () => (
  <MockedProviderWithContext mocks={mocks.singleSport} addTypename={false}>
    <SportsNav currentHash="#filter/football" />
  </MockedProviderWithContext>
));

stories.add("Error", () => (
  <MockedProviderWithContext mocks={mocks.error} addTypename={false}>
    <SportsNav currentHash="#filter/tennis/wta" />
  </MockedProviderWithContext>
));
