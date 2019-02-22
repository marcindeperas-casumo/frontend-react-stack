// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import { MockedProviderWithContext } from "Features/sports/state/testUtils";

import SportsNav from "./SportsNav";

import multipleSportsNavigationMock from "./__mocks__/userNavigationQuery";
import singleSportNavigationMock from "./__mocks__/userNavigationQuerySingle";

const stories = storiesOf("Sports/SportsNav", module);

stories.add("Multiple sports", () => {
  return (
    <MockedProviderWithContext
      mocks={multipleSportsNavigationMock}
      addTypename={false}
    >
      <SportsNav currentHash="#filter/football/champions_league" />
    </MockedProviderWithContext>
  );
});

stories.add("Single sport", () => {
  return (
    <MockedProviderWithContext
      mocks={singleSportNavigationMock}
      addTypename={false}
    >
      <SportsNav currentHash="#filter/tennis/wta" />
    </MockedProviderWithContext>
  );
});
