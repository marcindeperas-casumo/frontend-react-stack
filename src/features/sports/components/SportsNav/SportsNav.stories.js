// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";

import SportsNav from "./SportsNav";

import multipleSportsNavigationMock from "./__mocks__/userNavigationQuery";
import singleSportNavigationMock from "./__mocks__/userNavigationQuerySingle";

const stories = storiesOf("Sports/SportsNav", module);

stories.add(
  "Multiple sports",
  () => (
    <MockedProviderWithContext
      mocks={multipleSportsNavigationMock}
      addTypename={false}
    >
      <SportsNav currentHash="#filter/football/champions_league" />
    </MockedProviderWithContext>
  ),
  info({ text: "Multiple sports" })
);

stories.add(
  "Single sport",
  () => (
    <MockedProviderWithContext
      mocks={singleSportNavigationMock}
      addTypename={false}
    >
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProviderWithContext>
  ),
  info({ text: "Single sport" })
);
