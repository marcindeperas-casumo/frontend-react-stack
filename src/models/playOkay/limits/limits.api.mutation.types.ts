import { TCurrencyCode } from "Src/constants";
import { TPeriod } from "../playOkay.types";
import { TLimitGroup } from "../config/config.types";

export type TUpdateLoginTimeBlockArgs = {
  limit: string;
  periodSetting: Extract<TPeriod, "LoginBlockStart" | "LoginBlockEnd">;
  limitGroup: TLimitGroup;
};

export type TUpdateLoginTimeLimitArgs = {
  limitInMinutes: number;
  periodSetting: TPeriod;
  limitGroup: TLimitGroup;
};

export type TUpdateMoneyLimitArgs = {
  limit: {
    amount: number;
    iso4217CurrencyCode: TCurrencyCode;
  };
  periodSetting: TPeriod;
  limitGroup: TLimitGroup;
};

export type TUpdateLimitArgs =
  | TUpdateLoginTimeLimitArgs
  | TUpdateMoneyLimitArgs
  | TUpdateLoginTimeBlockArgs;

export type TRevokeLimitArgs = {
  periodSetting: TPeriod;
  limitGroup: TLimitGroup;
};

/**
 * deprecated, to be removed when SGA TimeLimits are replaced with new generic config-driven settings
 */
export type TRevokeLoginTimeLimitArgsDeprecated = {
  playerId: string;
  periodSetting: TPeriod;
};

export type TUpdateLoginTimeLimitArgsDeprecated = {
  limitInMinutes: number;
  periodSetting: TPeriod;
};

export type TCancelComingLimitArgs = {
  periodSetting: TPeriod;
  limitGroup: TLimitGroup;
};
