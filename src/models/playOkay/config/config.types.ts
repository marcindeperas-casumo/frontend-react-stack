import { TPeriod } from "../playOkay.types";
import { TTimeLimitType, TMoneyLimitType } from "../limits";

export type TLimitGroup = `money/${TMoneyLimitType}` | `time/${TTimeLimitType}`;

export type TPeriodSelection =
  | "none"
  | "all"
  | "anyone"
  | "anytwo"
  | Array<TPeriod>;

export type TLimitPeriodPermissions = {
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
  permissions: TLimitPeriodPermissions;
  field?: TLimitPeriodFieldConfig;
};

export type TLimitGroupConfig = {
  group: TLimitGroup;
  mandatory: TPeriodSelection;
  allowMany: boolean;
  available: Array<TLimitPeriodConfig>;
};

export type TGetPlayerConfigResponse = {
  limits: Array<TLimitGroupConfig>;
};

export type TApiToLocalLimitGroupMapping = {
  [apiType: string]: TLimitGroup;
};
