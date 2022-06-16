import { TPeriod } from "../playOkay.types";
import { TTimeLimitType, TMoneyLimitType } from "../limits";
import { TExclusionType } from "../exclusions";

export type TLimitGroup = `money/${TMoneyLimitType}` | `time/${TTimeLimitType}`;

export type TPeriodSelection =
  | "none"
  | "all"
  | "anyone"
  | "anytwo"
  | Array<TPeriod>;

export type TPermissions = {
  update: boolean;
  revoke: boolean;
  cancel: boolean;
};

export type TLimitPeriodFieldConfig =
  | {
      type: "text";
    }
  | {
      type: "select";
      choices: Array<[string | number, string]>;
    };

export type TLimitPeriodConfig = {
  period: TPeriod;
  min?: number;
  max?: number;
  default?: number;
  permissions: TPermissions;
  field?: TLimitPeriodFieldConfig;
};

export type TLimitGroupConfig = {
  group: TLimitGroup;
  mandatory: TPeriodSelection;
  allowMany: boolean;
  available: Array<TLimitPeriodConfig>;
};

export type TExclusionConfig = {
  type: TExclusionType;
  permissions: TPermissions;
  /**
   * array of number of days
   */
  validPeriods: Array<number>;
};

export type TGetPlayerConfigResponse = {
  limits: Array<TLimitGroupConfig>;
  exclusions: Array<TExclusionConfig>;
};

export type TApiToLocalLimitGroupMapping = {
  [apiType: string]: TLimitGroup;
};
