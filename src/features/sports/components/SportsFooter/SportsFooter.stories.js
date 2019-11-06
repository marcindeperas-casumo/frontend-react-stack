// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { SportsFooter } from "./SportsFooter";
import { mocks } from "./__mocks__/termMocks";

const stories = storiesOf("Sports/SportsFooter", module);

stories.add("Default View", () => (
  <MockedProvider mocks={mocks}>
    <SportsFooter />
  </MockedProvider>
));
