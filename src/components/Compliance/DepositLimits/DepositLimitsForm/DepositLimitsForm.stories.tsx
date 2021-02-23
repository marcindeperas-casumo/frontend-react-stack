// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsForm } from "./DepositLimitsForm";
import t from "./__mocks__/cms";

const stories = storiesOf("DepositLimits/DepositLimitsForm", module);

stories.add("Default", () => (
  <DepositLimitsForm
    t={t}
    currency="EUR"
    pendingLimitChanges={undefined}
    // @ts-expect-error ts-migrate(2739) FIXME: Type 'HandlerFunction' is missing the following pr... Remove this comment to see the full error message
    applyLimitsChanges={action("applyLimitsChanges click")}
    limits={{
      daily: 600,
      weekly: 1500,
      monthly: 3000,
      currency: "EUR",
    }}
    locale="en-GB"
    responsibleGamblingTestCanBeTaken
    fetchTranslations={() => {}}
  />
));
