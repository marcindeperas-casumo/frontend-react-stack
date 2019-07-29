// @flow
import type { DateTime } from "luxon";

export type AnnualOverview = {
  currency: string,
  betsAmount: number,
  winningsAmount: number,
  depositsAmount: number,
  withdrawalsAmount: number,
  awardedBonusesAmount: number,
  convertedBonusesAmount: number,
  startingBalanceAmount: number,
  endBalanceAmount: number,
};

export type WalletTotalsProps = {
  walletId: string,
  startTime: DateTime,
  endTime: DateTime,
};

export type FetchAnnualOverviewProps = {
  year: number,
  meta?: {
    resolve?: () => void,
    reject?: () => void,
  },
};
