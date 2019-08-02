// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const stories = storiesOf("DepositLimitsSuspendAccount", module);

stories.add("Default", () => (
  <DepositLimitsSuspendAccount
    t={{
      main_title: "Suspend account",
    }}
    fetchTranslations={action("fetchTranslations click")}
    showOldSuspendAccountView={action("showOldSuspendAccountView click")}
  />
));
