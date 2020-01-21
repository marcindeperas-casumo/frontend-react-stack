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

export type AnnualOverviewWrapper = {
  data?: AnnualOverview,
  meta: {
    isFetching?: boolean,
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
