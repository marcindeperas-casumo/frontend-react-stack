// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import isNotChromatic from "Storybook/isNotChromatic";
import { SportsNav } from "Features/sports/components/SportsNav";
import * as mocks from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";

const stories = storiesOf("Sports/SportsNav", module);

const waitForScrollablePaginated = { chromatic: { delay: 200 } };

if (isNotChromatic) {
  stories.add(
    "Many sports (desktop)",
    () => (
      <div className="c-sports-shell--site">
        <MockedProvider mocks={mocks.manySports} addTypename={false}>
          <SportsNav currentHash="#filter/tennis/wta" />
        </MockedProvider>
      </div>
    ),
    waitForScrollablePaginated
  );

  stories.add(
    "Many sports",
    () => (
      <MockedProvider mocks={mocks.manySports} addTypename={false}>
        <SportsNav currentHash="#filter/tennis/wta" />
      </MockedProvider>
    ),
    waitForScrollablePaginated
  );

  stories.add(
    "Multiple sports",
    () => (
      <MockedProvider mocks={mocks.multipleSports} addTypename={false}>
        <SportsNav currentHash="#filter/football/england/premier_league" />
      </MockedProvider>
    ),
    waitForScrollablePaginated
  );

  stories.add("Single sport", () => (
    <MockedProvider mocks={mocks.singleSport} addTypename={false}>
      <SportsNav currentHash="#filter/football" />
    </MockedProvider>
  ));

  stories.add("Error", () => (
    <MockedProvider mocks={mocks.error} addTypename={false}>
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProvider>
  ));
}
