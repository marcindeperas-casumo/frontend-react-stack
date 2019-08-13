// @flow
import { head, last, path } from "ramda";
import { formatCurrency } from "Utils";
import type {
  AnnualOverview,
  FetchAnnualOverviewPdfUrlProps,
  TransactionResponseRaw,
  StartingEndBalance,
} from "./transactionsBetsHistory.types";

type Props = {
  annualOverview: AnnualOverview,
  locale: string,
  year: number,
  name: string,
  dni: string,
};

export function prepareFetchAnnualOverviewPdfUrlProps({
  annualOverview,
  locale,
  year,
  name,
  dni,
}: Props): FetchAnnualOverviewPdfUrlProps {
  const { currency } = annualOverview;
  const formatCurrencyBound = value =>
    formatCurrency({ locale, currency, value });

  return {
    year,
    name,
    dni,
    startingBalance: formatCurrencyBound(annualOverview.startingBalanceAmount),
    endingBalance: formatCurrencyBound(annualOverview.endBalanceAmount),
    totalDeposits: formatCurrencyBound(annualOverview.depositsAmount),
    totalWithdrawals: formatCurrencyBound(annualOverview.withdrawalsAmount),
    totalWagers: formatCurrencyBound(annualOverview.betsAmount),
    totalWins: formatCurrencyBound(annualOverview.winningsAmount),
    totalBonusesConverted: formatCurrencyBound(
      annualOverview.convertedBonusesAmount
    ),
  };
}

export function getStartingEndBalanceFromTransactions(
  transactions: Array<TransactionResponseRaw>
): StartingEndBalance {
  // API returns a sorted list, from the latest transaction to the oldest
  return {
    startingBalanceAmount: path(
      ["balanceBefore", "amount"],
      last(transactions)
    ),
    endBalanceAmount: path(["balanceAfter", "amount"], head(transactions)),
  };
}
