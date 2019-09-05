// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import { ComingSoonPage } from "./ComingSoonPage";
import { MaintenancePage } from "./MaintenancePage";
import { mocks } from "./__mocks__/termMocks";

const stories = storiesOf("Sports/MessagePage", module);

stories.add("Coming Soon", () => (
  <MockedProviderWithContext mocks={mocks} addTypename={false}>
    <ComingSoonPage />
  </MockedProviderWithContext>
));

stories.add("Maintenance", () => (
  <MockedProviderWithContext mocks={mocks} addTypename={false}>
    <MaintenancePage />
  </MockedProviderWithContext>
));
