// @flow
import { CURRENCIES } from "Src/constants";

type RealBonusAmountType = {
  real: number,
  bonus: number,
};

export type AnnualOverviewType = {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Values'.
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

export type FetchAnnualOverviewProps = {
  year: number,
  meta?: {
    resolve?: () => void,
    reject?: () => void,
  },
};
