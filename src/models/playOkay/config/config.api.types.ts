import { TMoneyAmount } from "../limits";
import { TPeriod } from "../playOkay.types";

export type TApiLimitRequirement = "OPTIONAL" | "ONE" | "ALL";

export type TApiLimitMasterGroup = "money" | "time";

type TApiGroupPermissions = {
  update: boolean;
  revoke: boolean;
  cancel: boolean;
};

export type TApiLimitGroup =
  | "affordability"
  | "deposit"
  | "loss"
  | "spendingBudget"
  | "wager"
  | "loginTime"
  | "loginBlock";

export type TApiExclusionGroup = "selfExclusion" | "takeABreak";

export type TApiLimitGroupConfig = {
  enabled: boolean;
  allowMany: boolean;
  permissions: TApiGroupPermissions;
  requirement: TApiLimitRequirement;
  validPeriods?: Array<TPeriod>;
  maxAllowedLimits?: {
    [prop: string]: TMoneyAmount;
  };
  minAllowedLimits?: {
    [prop: string]: TMoneyAmount;
  };
};

export type TApiExclusionGroupConfig = {
  enabled: boolean;
  permissions: TApiGroupPermissions;
  validPeriods: {
    [key: string]: number;
  };
};

export type TApiExclusionGroupRecord = Record<
  TApiExclusionGroup,
  TApiExclusionGroupConfig
>;

/* eslint-disable no-unused-vars */
export type TApiGetPlayerConfigResponse = {
  limits: {
    [masterGroup in TApiLimitMasterGroup]: {
      [group in TApiLimitGroup]: TApiLimitGroupConfig;
    };
  };
  exclusions: TApiExclusionGroupRecord;
};
/* eslint-enable no-unused-vars */
