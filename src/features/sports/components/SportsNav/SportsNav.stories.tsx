import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { SportsNav } from "Features/sports/components/SportsNav";
import * as mocks from "Features/sports/components/SportsNav/__mocks__/userNavigationQuery";

const stories = storiesOf("Sports/SportsNav", module);

const waitForScrollablePaginated = { chromatic: { delay: 200 } };

if (isNotChromatic) {
  stories.add(
    "Many sports (desktop)",
    () => (
      <div className="c-sports-shell--site">
        <MockStore>
          <MockedProvider mocks={mocks.manySports} addTypename={false}>
            <SportsNav currentHash="#filter/tennis/wta" />
          </MockedProvider>
        </MockStore>
      </div>
    ),
    waitForScrollablePaginated
  );

  stories.add(
    "Many sports",
    () => (
      <MockStore>
        <MockedProvider mocks={mocks.manySports} addTypename={false}>
          <SportsNav currentHash="#filter/tennis/wta" />
        </MockedProvider>
      </MockStore>
    ),
    waitForScrollablePaginated
  );

  stories.add(
    "Multiple sports",
    () => (
      <MockStore>
        <MockedProvider mocks={mocks.multipleSports} addTypename={false}>
          <SportsNav currentHash="#filter/football/england/premier_league" />
        </MockedProvider>
      </MockStore>
    ),
    waitForScrollablePaginated
  );

  stories.add("Single sport", () => (
    <MockStore>
      <MockedProvider mocks={mocks.singleSport} addTypename={false}>
        <SportsNav currentHash="#filter/football" />
      </MockedProvider>
    </MockStore>
  ));

  stories.add("Error", () => (
    <MockStore>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ error: boolean; request: { query: Document... Remove this comment to see the full error message */}
      <MockedProvider mocks={mocks.error} addTypename={false}>
        <SportsNav currentHash="#filter/tennis/wta" />
      </MockedProvider>
    </MockStore>
  ));
}
