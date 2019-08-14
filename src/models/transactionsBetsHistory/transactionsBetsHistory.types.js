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
  pdfUrl?: string,
};

export type AnnualOverviewWrapper = {
  data?: AnnualOverview,
  meta: {
    isFetching?: boolean,
    isPdfUrlFetching?: boolean,
  },
};

export type WalletTotalsProps = {
  walletId: string,
  startTime: DateTime,
  endTime: DateTime,
};

export type WalletTransactionsProps = WalletTotalsProps & {
  perPage?: number,
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
  /** All the properties below are sent as formatted amounts with currency */
  startingBalance: string,
  endingBalance: string,
  totalDeposits: string,
  totalWithdrawals: string,
  totalWagers: string,
  totalWins: string,
  totalBonusesConverted: string,
};

export type AmountWithCodeResponseRaw = {
  amount: number,
  iso4217CurrencyCode: string,
};

export type TransactionResponseRaw = {
  balanceBefore: AmountWithCodeResponseRaw,
  balanceAfter: AmountWithCodeResponseRaw,
  delta: AmountWithCodeResponseRaw,
  fee: ?AmountWithCodeResponseRaw,
  id: string,
  paymentMethodId: ?string,
  reason: ?string,
  sequenceNumber: number,
  state: ?string,
  timestamp: number,
  walletId: string,
  walletUpdateSource: string,
  withdrawalLocked: boolean,
};

export type StartingEndBalance = {
  startingBalanceAmount: number,
  endBalanceAmount: number,
};
