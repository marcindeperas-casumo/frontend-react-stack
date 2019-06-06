// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MockedProvider } from "react-apollo/test-utils";
import { viewports } from "Storybook/viewports";
import { BettingGlossary } from "Features/sports/components/BettingGlossary";
import { ModalsArea } from "Features/sports/components/Modals";
import { mocks } from "./__mocks__/glossaryMocks";

const stories = storiesOf("Sports/BettingGlossary", module);

stories.addDecorator(story => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {story()}
  </MockedProvider>
));

stories.add(
  "Default View",
  () => (
    <ModalsArea>
      <BettingGlossary onClose={action("onClose")} />
    </ModalsArea>
  ),
  viewports.mobile
);
