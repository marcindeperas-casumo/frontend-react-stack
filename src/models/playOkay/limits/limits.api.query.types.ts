import { TCurrencyCode } from "Src/constants";
import { TPeriod } from "../playOkay.types";

export type TMoneyLimitType =
  | "LossLimit"
  | "DepositLimit"
  | "WagerLimit"
  | "AffordabilityLimit"
  | "SpendingBudget";

export type TTimeLimitType = "LoginTimeLimit" | "LoginTimeBlock";

export type TLimitType = TMoneyLimitType | TTimeLimitType;

export type TMoneyAmount = {
  amount: number;
  iso4217CurrencyCode: TCurrencyCode;
};

type TComingLimitBase = {
  activationTime: number;
  automaticRevocation: boolean;
  waitingForConfirmation: boolean;
};

export type TMoneyLimit = {
  comingChange?: TComingLimitBase & {
    period: TPeriod;
    limit: TMoneyAmount;
  };
  consumedAmount: TMoneyAmount;
  limit: TMoneyAmount;
  limitId: string;
  limitType: TMoneyLimitType;
  period: TPeriod;
};

export type TLoginTimeComingLimit = TComingLimitBase & {
  /**
   * string: ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string;
};

export type TLoginTimeComingRevocation = {
  revocationTime: number;
  automaticRevocation: boolean;
  waitingForConfirmation: boolean;
};

export type TLoginTimeLimit = {
  comingLimit: TLoginTimeComingLimit | null;
  comingRevocation: TLoginTimeComingRevocation | null;
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  consumedTime: string;
  consumedTimeTimestamp: number;
  /**
   * ISO8601 duration, https://en.wikipedia.org/wiki/ISO_8601#Durations
   */
  limit: string;
  period: TPeriod;
  scheduledEndTime: number;
};

export type TLoginTimeBlockLimit = {
  comingLimit?: TComingLimitBase & {
    start: string;
    end: string;
  };
  comingRevocation: TLoginTimeComingRevocation | null;
  start: string;
  end: string;
};

export type TGetPlayerStateByIdResponse = {
  excludedUntil: string | null;
  indefiniteExclusion: string | null;
  loginTimeBlock: TLoginTimeBlockLimit | null;
  loginTimeLimits: Array<TLoginTimeLimit>;
  marketingClosure: any;
  moneyLimits: Array<TMoneyLimit>;
  realityCheckIntervalSeconds: number;
  realityCheckIntervalUpdatable: boolean;
  realityCheckZeroIntervalAllowed: boolean;
};

export type TLimitGroupFormDataItem = {
  period: TPeriod;
  value: number | null;
  hasChanged?: boolean;
};

export type TLimitGroupFormData = Array<TLimitGroupFormDataItem>;

export type TLimitInternalFormat = {
  period: TPeriod;
  value: number | null;
  consumedAmount?: number;
  comingChange?: {
    value: number;
    activationTime: number;
    period: TPeriod;
  };
  comingRevocation?: {
    revocationTime: number;
    automaticRevocation: boolean;
    waitingForConfirmation: boolean;
  };
};
