// @flow
import { formatCurrency } from "Utils";
import type {
  AnnualOverview,
  FetchAnnualOverviewPdfUrlProps,
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
    startingBalance: formatCurrencyBound(0),
    endingBalance: formatCurrencyBound(0),
    totalDeposits: formatCurrencyBound(annualOverview.depositsAmount),
    totalWithdrawals: formatCurrencyBound(annualOverview.withdrawalsAmount),
    totalWagers: formatCurrencyBound(0),
    totalWins: formatCurrencyBound(annualOverview.winningsAmount),
    totalBonusesConverted: formatCurrencyBound(
      annualOverview.convertedBonusesAmount
    ),
  };
}
