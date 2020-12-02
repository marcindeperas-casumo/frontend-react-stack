// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { BalanceBetSlip } from "./BalanceBetSlip";

const stories = storiesOf("Sports/BalanceBetSlip", module);

stories.add("Default", () => (
  <MockStore>
    <BalanceBetSlip maximized={true} />
  </MockStore>
));
