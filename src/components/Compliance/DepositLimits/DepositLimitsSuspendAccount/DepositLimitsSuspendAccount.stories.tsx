import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import { DepositLimitsSuspendAccount } from "./DepositLimitsSuspendAccount";

const stories = storiesOf("DepositLimits/DepositLimitsSuspendAccount", module);

stories.add("Default", () => (
  <DepositLimitsSuspendAccount
    t={{
      suspend_account: "Suspend account",
      add: "Add",
    }}
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: { suspend_account: string; add: string;... Remove this comment to see the full error message
    fetchTranslations={action("fetchTranslations click")}
    showOldSuspendAccountView={action("showOldSuspendAccountView click")}
  />
));
