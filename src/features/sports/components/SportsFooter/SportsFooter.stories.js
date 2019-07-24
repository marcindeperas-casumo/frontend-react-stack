// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import { SportsFooter } from "./SportsFooter";
import { mocks } from "./__mocks__/termMocks";

const stories = storiesOf("Sports/SportsFooter", module);

stories.add("Default View", () => (
  <MockedProviderWithContext mocks={mocks}>
    <SportsFooter />
  </MockedProviderWithContext>
));
