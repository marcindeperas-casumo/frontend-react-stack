// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { viewports } from "Storybook/viewports";
import { BettingGlossary } from "Features/sports/components/BettingGlossary";
import { ModalsArea } from "Features/sports/components/Modals";

const stories = storiesOf("Sports/BettingGlossary", module);

stories.add(
  "Default View",
  () => (
    <ModalsArea>
      <BettingGlossary onClose={action("onClose")} />
    </ModalsArea>
  ),
  viewports.mobile
);
