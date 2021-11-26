import type { DepositLimitsReduxStore } from "./depositLimits";
import type { TLoginTimeLimit } from "./timeLimits/timeLimits.types";

export type TPeriod = "Daily" | "Weekly" | "Monthly";

export type GetAllLimitsProps = {
  playerId: string;
};

export type SetDepositLimitProps = {
  playerId: string;
  limit: number;
  periodSetting: TPeriod;
};

export type PlayOkayReduxStore = {
  moneyLimits?: Array<any>;
  isDepositLimitProperlySet: boolean;
};

export type PlayOkayRootReduxStore = {
  depositLimits: DepositLimitsReduxStore;
  playOkay: PlayOkayReduxStore;
};

export type TGetPlayerStateByIdResponse = {
  excludedUntil: string | null;
  indefiniteExclusion: string | null;
  loginTimeBlock: string | null;
  loginTimeLimit: TLoginTimeLimit | null;
  loginTimeLimits: Array<TLoginTimeLimit>;
  marketingClosure: any;
  moneyLimits: Array<any>;
  realityCheckIntervalSeconds: number;
  realityCheckIntervalUpdatable: boolean;
  realityCheckZeroIntervalAllowed: boolean;
};

export type TUpdateLoginTimeLimitArgs = {
  playerId: string;
  limitInMinutes: number;
  periodSetting: TPeriod;
};

export type TRevokeLoginTimeLimitArgs = {
  playerId: string;
  periodSetting: TPeriod;
};
