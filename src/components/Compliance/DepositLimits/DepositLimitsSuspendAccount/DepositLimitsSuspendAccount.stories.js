// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const stories = storiesOf("DepositLimitsSuspendAccount", module);

stories.add("Default", () => (
  <DepositLimitsSuspendAccount
    t={{
      suspend_account: "Suspend account",
      add: "Add",
    }}
    fetchTranslations={action("fetchTranslations click")}
    showOldSuspendAccountView={action("showOldSuspendAccountView click")}
  />
));
