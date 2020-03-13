// @flow
import { DateTime } from "luxon";
import { CURRENCIES } from "Src/constants";

type RealBonusAmountType = {
  real: number,
  bonus: number,
};

export type AnnualOverviewType = {
  currency: $Values<typeof CURRENCIES>,
  startingBalance: RealBonusAmountType,
  endingBalance: RealBonusAmountType,
  bets: RealBonusAmountType,
  wins: RealBonusAmountType,
  deposits: number,
  withdrawals: number,
  bonus: {
    awarded: number,
    converted: number,
  },
  realMoneyGiven: number,
};

export type AnnualOverviewTypeWrapper = {
  data?: AnnualOverviewType,
  meta: {
    isFetching?: boolean,
  },
};

export type WalletTransactionsProps = {
  walletId: string,
  startTime: DateTime,
  endTime: DateTime,
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
