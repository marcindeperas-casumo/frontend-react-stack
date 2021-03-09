import { DateTime } from "luxon";
import clientHttp from "Lib/http";
import { CURRENCIES } from "Src/constants";
import type { AnnualOverviewType } from "Models/transactionsBetsHistory";

type HTTPClient = typeof clientHttp;

type GetSummaryUrlProps = {
  date: DateTime;
  currency: ValueOf<typeof CURRENCIES>;
  periodicity?: "ANNUAL" | "MONTHLY" | "DAILY";
  asPdf?: boolean;
};

// http://player-transactions.at.casumotest.local:8080/swagger-ui.html#/summaries-public-controller/getSummaryReportFileUsingGET
export const getSummaryUrl = ({
  periodicity = "ANNUAL",
  date,
  currency,
  asPdf = false,
}: GetSummaryUrlProps): string => {
  return `/casino-player/player-transactions/api/summaries/${periodicity}/${date.toFormat(
    "y-MM-dd"
  )}/${currency}${asPdf ? "/PDF" : ""}`;
};

export const getSummaryReq = (
  props: GetSummaryUrlProps,
  http: HTTPClient = clientHttp
): Promise<AnnualOverviewType> => {
  return http.get(getSummaryUrl(props));
};
