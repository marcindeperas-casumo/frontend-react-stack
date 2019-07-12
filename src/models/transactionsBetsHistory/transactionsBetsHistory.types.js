// @flow
import type { DateTime } from "luxon";

export type AnnualOverview = {
  betsAmount: number,
  winningsAmount: number,
  depositsAmount: number,
  withdrawalsAmount: number,
  bonusesAmount: number,
};

export type GetTotalsReqProps = {
  walletId: string,
  startTime: DateTime,
  endTime: DateTime,
};
