import * as React from "react";
import { DateTime } from "luxon";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TLimitGroupConfig, TLimitInternalFormat } from "Models/playOkay";
import { settingsCms } from "Models/playOkay/__mocks__/settingsCms";
import { LimitsCard } from "./LimitsCard";

export default {
  component: LimitsCard,
} as ComponentMeta<typeof LimitsCard>;

const limitGroupWithDaily: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 10,
    consumedAmount: 4,
  },
];
const limitGroupWithTwo: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 100,
    consumedAmount: 10,
  },
  {
    period: "Monthly",
    value: 1000,
    consumedAmount: 45,
  },
];
const limitGroupWithThree: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 12,
    consumedAmount: 10,
  },
  {
    period: "Weekly",
    value: 40,
    consumedAmount: 10,
  },
  {
    period: "Monthly",
    value: 600,
    consumedAmount: 45,
  },
];
const limitGroupWithComingChange: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 100,
    consumedAmount: 10,
  },
  {
    period: "Monthly",
    value: 1000,
    consumedAmount: 45,
    comingChange: {
      activationTime: DateTime.fromObject({
        year: 2022,
        month: 11,
        day: 21,
      }).toMillis(),
      period: "Monthly",
      value: 2000,
    },
  },
];
const limitGroupWithComingRevocation: Array<TLimitInternalFormat> = [
  {
    period: "Daily",
    value: 100,
    consumedAmount: 10,
    comingRevocation: {
      revocationTime: DateTime.fromObject({
        year: 2022,
        month: 11,
        day: 21,
      }).toMillis(),
      automaticRevocation: true,
      waitingForConfirmation: false,
    },
  },
];
const loginTimeBlockGroup: Array<TLimitInternalFormat> = [
  {
    period: "LoginBlockStart",
    value: 1,
  },
  {
    period: "LoginBlockEnd",
    value: 9,
  },
];

const permissions = { update: true, revoke: true, cancel: true };
const depositLimitsGroupConfig: TLimitGroupConfig = {
  group: "money/DepositLimit",
  allowMany: false,
  mandatory: "anyone",
  available: [{ period: "Daily", permissions }],
};
const lossLimitsGroupConfig: TLimitGroupConfig = {
  group: "money/LossLimit",
  allowMany: true,
  mandatory: "anyone",
  available: [
    { period: "Daily", permissions },
    { period: "Weekly", permissions },
    { period: "Monthly", permissions },
  ],
};

const wagerLimitsGroupConfig: TLimitGroupConfig = {
  group: "money/WagerLimit",
  allowMany: false,
  mandatory: "anyone",
  available: [
    { period: "Daily", permissions },
    { period: "Monthly", permissions },
  ],
};

const spendingBudgetGroupConfig: TLimitGroupConfig = {
  group: "money/SpendingBudget",
  allowMany: false,
  mandatory: "none",
  available: [{ period: "Daily", permissions }],
};
const loginTimeLimitsGroupConfig: TLimitGroupConfig = {
  group: "time/LoginTimeLimit",
  allowMany: true,
  mandatory: "all",
  available: [
    { period: "Daily", permissions, max: 23 },
    { period: "Weekly", permissions, max: 167 },
    { period: "Monthly", permissions, max: 671 },
  ],
};
const loginTimeBlockGroupConfig: TLimitGroupConfig = {
  group: "time/LoginTimeBlock",
  allowMany: true,
  mandatory: "none",
  available: [
    { period: "LoginBlockStart", permissions },
    { period: "LoginBlockEnd", permissions },
  ],
};

export const DepositLimit: ComponentStory<typeof LimitsCard> = () => (
  <LimitsCard
    t={settingsCms}
    currency="GBP"
    locale="en-GB"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithDaily}
    limitsGroupConfig={depositLimitsGroupConfig}
  />
);

export const NonEditableDepositLimit: ComponentStory<
  typeof LimitsCard
> = () => (
  <LimitsCard
    t={settingsCms}
    currency="GBP"
    locale="en-GB"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithDaily}
    limitsGroupConfig={{
      ...depositLimitsGroupConfig,
      available: [
        {
          ...depositLimitsGroupConfig.available[0],
          permissions: { update: false, revoke: false, cancel: false },
        },
      ],
    }}
  />
);

export const LossLimit: ComponentStory<typeof LimitsCard> = () => (
  <LimitsCard
    t={settingsCms}
    currency="GBP"
    locale="en-GB"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithTwo}
    limitsGroupConfig={lossLimitsGroupConfig}
  />
);

export const WagerLimitWithComingChange: ComponentStory<
  typeof LimitsCard
> = () => (
  <LimitsCard
    t={settingsCms}
    currency="EUR"
    locale="en"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithComingChange}
    limitsGroupConfig={wagerLimitsGroupConfig}
  />
);

export const SpendingBudgetWithComingRevocation: ComponentStory<
  typeof LimitsCard
> = () => (
  <LimitsCard
    t={settingsCms}
    currency="EUR"
    locale="en"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithComingRevocation}
    limitsGroupConfig={spendingBudgetGroupConfig}
  />
);

export const SpendingBudgetWithNonCancellableComingRevocation: ComponentStory<
  typeof LimitsCard
> = () => (
  <LimitsCard
    t={settingsCms}
    currency="EUR"
    locale="en"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithComingRevocation}
    limitsGroupConfig={{
      ...spendingBudgetGroupConfig,
      available: [
        {
          period: "Daily",
          permissions: { update: true, revoke: true, cancel: false },
        },
      ],
    }}
  />
);

export const LoginTimeLimits: ComponentStory<typeof LimitsCard> = () => (
  <LimitsCard
    t={settingsCms}
    currency="EUR"
    locale="en"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={limitGroupWithThree}
    limitsGroupConfig={loginTimeLimitsGroupConfig}
  />
);

export const LoginTimeBlock: ComponentStory<typeof LimitsCard> = () => (
  <LimitsCard
    t={settingsCms}
    currency="EUR"
    locale="en"
    cancelComingLimit={() => null}
    onClick={() => null}
    limitsInGroup={loginTimeBlockGroup}
    limitsGroupConfig={loginTimeBlockGroupConfig}
  />
);
