// @flow
import { type AnnualOverviewType } from "Models/transactionsBetsHistory";

export default ({
  startingBalance: {
    real: 1000,
    bonus: 0,
  },
  endingBalance: {
    real: 1111,
    bonus: 11,
  },
  bets: {
    real: 66,
    bonus: 32,
  },
  deposits: 72,
  withdrawals: 39,
  wins: {
    real: 98.8,
    bonus: 1.1,
  },
  bonus: {
    awarded: 13,
    converted: 45,
  },
  realMoneyGiven: 200,
  currency: "GBP"
}: AnnualOverviewType);
