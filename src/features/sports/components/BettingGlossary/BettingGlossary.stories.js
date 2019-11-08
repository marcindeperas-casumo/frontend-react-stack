// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "@apollo/react-testing";
import { viewports } from "Storybook/viewports";
import { BettingGlossary } from "Features/sports/components/BettingGlossary";
import { ModalsArea } from "Features/sports/components/Modals";
import { mocks } from "./__mocks__/glossaryMocks";

const stories = storiesOf("Sports/BettingGlossary", module);

const onClose = action("onClose");

stories.add(
  "Default View",
  () => (
    <MockedProvider mocks={mocks.success} addTypename={false}>
      <ModalsArea>
        <BettingGlossary onClose={onClose} />
      </ModalsArea>
    </MockedProvider>
  ),
  viewports.mobile
);

stories.add(
  "Loading",
  () => (
    <MockedProvider mocks={mocks.loading} addTypename={false}>
      <ModalsArea>
        <BettingGlossary onClose={onClose} />
      </ModalsArea>
    </MockedProvider>
  ),
  viewports.mobile
);

stories.add(
  "Error",
  () => (
    <MockedProvider mocks={mocks.error} addTypename={false}>
      <ModalsArea>
        <BettingGlossary onClose={onClose} />
      </ModalsArea>
    </MockedProvider>
  ),
  viewports.mobile
);
