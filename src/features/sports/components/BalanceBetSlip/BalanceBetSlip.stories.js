// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { BalanceBetSlip } from "./BalanceBetSlip";

const stories = storiesOf("Sports/BalanceBetSlip", module);

stories.add("Default", () => <BalanceBetSlip />);
