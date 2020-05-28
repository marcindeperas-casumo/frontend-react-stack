// @flow
import { type DepositLimitsReduxStore } from "./depositLimits";

export type LoginTimeLimits = {
  daily: number,
  weekly: number,
  monthly: number,
};

export type PlayOkayReduxStore = {
  moneyLimits?: Array<any>,
  isDepositLimitProperlySet: boolean,
  loginTimeLimits?: ?LoginTimeLimits,
};

export type PlayOkayRootReduxStore = {
  depositLimits: DepositLimitsReduxStore,
  playOkay: PlayOkayReduxStore,
};
