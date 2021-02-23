// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import { Deposit } from "./Deposit";

const stories = storiesOf("Sports/Deposit", module);

stories.add(
  "Deposit default",
  () => (
    <MockStore state={defaultState}>
      <Deposit
        hasDeposited={true}
        balance={123456}
        bonus={666}
        locale="en-IN"
        currency="INR"
      />
    </MockStore>
  ),
  viewports.mobile
);
