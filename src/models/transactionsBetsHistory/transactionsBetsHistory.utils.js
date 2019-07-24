// @flow
import type {
  AnnualOverview,
  FetchAnnualOverviewPdfUrlProps,
} from "./transactionsBetsHistory.types";

type Props = {
  annualOverview: AnnualOverview,
  year: number,
  name: string,
  dni: string,
};

export function prepareFetchAnnualOverviewPdfUrlProps({
  annualOverview,
  year,
  name,
  dni,
}: Props): FetchAnnualOverviewPdfUrlProps {
  return {
    year,
    name,
    dni,
    startingBalance: 0,
    endingBalance: 0,
    totalDeposits: annualOverview.depositsAmount,
    totalWithdrawals: annualOverview.withdrawalsAmount,
    totalWagers: 0,
    totalWins: annualOverview.winningsAmount,
    totalBonusesConverted: annualOverview.convertedBonusesAmount,
  };
}
