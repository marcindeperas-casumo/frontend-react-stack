import { TMoneyAmount } from "../limits";
import { TPeriod } from "../playOkay.types";

export type TApiLimitRequirement = "OPTIONAL" | "ONE" | "ALL";

export type TApiLimitMasterGroup = "money" | "time";

export type TApiLimitGroup =
  | "affordability"
  | "deposit"
  | "loss"
  | "spendingBudget"
  | "wager"
  | "loginTime"
  | "loginBlock";

export type TApiLimitGroupConfig = {
  enabled: boolean;
  allowMany: boolean;
  permissions: {
    update: boolean;
    revoke: boolean;
    cancel: boolean;
  };
  requirement: TApiLimitRequirement;
  validPeriods?: Array<TPeriod>;
  maxAllowedLimits?: {
    [prop: string]: TMoneyAmount;
  };
  minAllowedLimits?: {
    [prop: string]: TMoneyAmount;
  };
};

/* eslint-disable no-unused-vars */
export type TApiGetPlayerConfigResponse = {
  limits: {
    [masterGroup in TApiLimitMasterGroup]: {
      [group in TApiLimitGroup]: TApiLimitGroupConfig;
    };
  };
};
/* eslint-enable no-unused-vars */
