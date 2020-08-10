// @flow
import { type DepositLimitsReduxStore } from "./depositLimits";
import { type LoginTimeLimit } from "./timeLimits/timeLimits.types";

export type Period = "Daily" | "Weekly" | "Monthly";

export type GetAllLimitsProps = {
  playerId: string,
};

export type SetDepositLimitProps = {
  playerId: string,
  limit: number,
  periodSetting: Period,
};

export type PlayOkayReduxStore = {
  moneyLimits?: Array<any>,
  isDepositLimitProperlySet: boolean,
  loginTimeLimits?: Array<LoginTimeLimit>,
};

export type PlayOkayRootReduxStore = {
  depositLimits: DepositLimitsReduxStore,
  playOkay: PlayOkayReduxStore,
};
