// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const stories = storiesOf("DepositLimits/DepositLimitsSuspendAccount", module);

stories.add("Default", () => (
  <DepositLimitsSuspendAccount
    t={{
      suspend_account: "Suspend account",
      add: "Add",
    }}
    fetchTranslations={action("fetchTranslations click")}
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'HandlerFunction' is not assignable to type '... Remove this comment to see the full error message
    showOldSuspendAccountView={action("showOldSuspendAccountView click")}
  />
));
