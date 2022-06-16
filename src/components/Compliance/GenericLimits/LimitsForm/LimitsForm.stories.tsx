import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TLimitGroupConfig, TLimitGroupFormData } from "Models/playOkay";
import { settingsCms } from "Models/playOkay/__mocks__/settingsCms";
import { loginBlockChoices } from "Models/playOkay/config/config.constants";
import { LimitsForm } from "./LimitsForm";

export default {
  component: LimitsForm,
} as ComponentMeta<typeof LimitsForm>;

const permissions = { update: true, revoke: true, cancel: true };
const limitGroupConfig: TLimitGroupConfig = {
  group: "money/DepositLimit",
  allowMany: true,
  mandatory: "none",
  available: [
    { period: "Daily", permissions },
    { period: "Weekly", permissions },
  ],
};
const loginTimeLimitGroupConfig: TLimitGroupConfig = {
  group: "time/LoginTimeLimit",
  allowMany: true,
  mandatory: "none",
  available: [
    { period: "Daily", permissions, max: 23 },
    { period: "Weekly", permissions, max: 167 },
    { period: "Monthly", permissions, max: 671 },
  ],
};
const loginTimeBlockGroupConfig: TLimitGroupConfig = {
  group: "time/LoginTimeBlock",
  allowMany: false,
  mandatory: "none",
  available: [
    {
      period: "LoginBlockStart",
      permissions,
      field: { type: "select", choices: loginBlockChoices },
    },
    {
      period: "LoginBlockEnd",
      permissions,
      field: { type: "select", choices: loginBlockChoices },
    },
  ],
};
const currenGroupWithTwo: TLimitGroupFormData = [
  { period: "Daily", value: 100 },
  { period: "Weekly", value: 100 },
];
const newGroupWithTwo: TLimitGroupFormData = [
  { period: "Daily", value: 110, hasChanged: true },
  { period: "Weekly", value: 200, hasChanged: true },
];
const newGroupWithMinMaxProblem: TLimitGroupFormData = [
  { period: "Daily", value: 222, hasChanged: true },
  { period: "Weekly", value: 200, hasChanged: false },
];
const newGroupWithOne: TLimitGroupFormData = [
  { period: "Daily", value: 110, hasChanged: true },
];
const loginTimeLimitGroup: TLimitGroupFormData = [
  { period: "Daily", value: 12 },
];
const loginTimeBlockGroup: TLimitGroupFormData = [
  { period: "LoginBlockStart", value: 2 },
];

export const Blank: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    isValid
    limitGroupConfig={limitGroupConfig}
    limitsInGroup={[]}
    newLimitsInGroup={[]}
    validatorResponse="valid"
  />
);

export const FilledValid: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    isValid
    limitGroupConfig={limitGroupConfig}
    limitsInGroup={currenGroupWithTwo}
    newLimitsInGroup={currenGroupWithTwo}
    validatorResponse="valid"
  />
);

export const FilledValidWithChange: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    isValid
    limitGroupConfig={limitGroupConfig}
    limitsInGroup={currenGroupWithTwo}
    newLimitsInGroup={newGroupWithTwo}
    validatorResponse="valid"
  />
);

export const InvalidWithOneMandatory: ComponentStory<
  typeof LimitsForm
> = () => (
  <LimitsForm
    t={settingsCms}
    currency="SEK"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    limitGroupConfig={{
      ...limitGroupConfig,
      mandatory: "anyone",
    }}
    limitsInGroup={currenGroupWithTwo}
    newLimitsInGroup={[]}
    isValid={false}
    savingDisabled
    validatorResponse="anyone_required"
  />
);

export const InvalidWithMinMaxProblem: ComponentStory<
  typeof LimitsForm
> = () => (
  <LimitsForm
    t={settingsCms}
    currency="GBP"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    limitGroupConfig={{
      ...limitGroupConfig,
    }}
    limitsInGroup={currenGroupWithTwo}
    newLimitsInGroup={newGroupWithMinMaxProblem}
    isValid={false}
    savingDisabled
    hasPeriodSpecificErrors
    validatorResponse={["daily_too_high"]}
  />
);

export const SavingFailed: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    allowMultiplePeriods
    isValid
    limitGroupConfig={limitGroupConfig}
    limitsInGroup={[]}
    newLimitsInGroup={newGroupWithTwo}
    validatorResponse="valid"
    savingFailed
  />
);

export const SinglePeriodPossible: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    isValid
    limitGroupConfig={limitGroupConfig}
    limitsInGroup={[]}
    newLimitsInGroup={newGroupWithOne}
    validatorResponse="valid"
  />
);

export const LoginTimeLimits: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    isValid
    limitGroupConfig={loginTimeLimitGroupConfig}
    limitsInGroup={[]}
    newLimitsInGroup={loginTimeLimitGroup}
    validatorResponse="valid"
  />
);

export const LoginTimeBlock: ComponentStory<typeof LimitsForm> = () => (
  <LimitsForm
    t={settingsCms}
    currency="EUR"
    dispatch={() => null}
    onClickCta={() => null}
    isValid
    limitGroupConfig={loginTimeBlockGroupConfig}
    limitsInGroup={[]}
    newLimitsInGroup={loginTimeBlockGroup}
    validatorResponse="valid"
    allowMultiplePeriods
  />
);
