// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DepositLimitsTopNavigation } from "./DepositLimitsTopNavigation";

const stories = storiesOf("DepositLimits/DepositLimitsTopNavigation", module);

stories.add("Default", () => <DepositLimitsTopNavigation />);
