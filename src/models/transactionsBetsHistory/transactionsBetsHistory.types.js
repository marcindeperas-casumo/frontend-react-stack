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
  pdfUrl?: string,
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

export type Action = {
  name: string,
  type: string,
};

export type FetchAnnualOverviewPdfUrlProps = {
  /** The full name of a player to generate pdf for */
  name: string,
  /** Player's Identification Number */
  dni: string,
  /** The year for which to generate the pdf */
  year: number,
  startingBalance: number,
  endingBalance: number,
  totalDeposits: number,
  totalWithdrawals: number,
  totalWagers: number,
  totalWins: number,
  totalBonusesConverted: number,
};
