// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { ComingSoonPage } from "./ComingSoonPage";
import { MaintenancePage } from "./MaintenancePage";
import { mocks } from "./__mocks__/termMocks";

const stories = storiesOf("Sports/MessagePage", module);

stories.add("Coming Soon", () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ComingSoonPage />
  </MockedProvider>
));

stories.add("Maintenance", () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <MaintenancePage />
  </MockedProvider>
));
