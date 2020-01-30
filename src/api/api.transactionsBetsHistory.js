// @flow
import { DateTime } from "luxon";
import clientHttp from "Lib/http";
import { CURRENCIES } from "Src/constants";
import { URLS as COMMON_URLS } from "Api/api.common";
import type {
  AnnualOverviewType,
  WalletTransactionsProps,
  TransactionResponseRaw,
} from "Models/transactionsBetsHistory";

type HTTPClient = typeof clientHttp;

type GetSummaryUrlProps = {
  date: DateTime,
  currency: $Values<typeof CURRENCIES>,
  periodicity?: "ANNUAL" | "MONTHLY" | "DAILY",
  asPdf?: boolean,
};

const getTransactionsUrl = ({
  startTime,
  endTime,
  walletId,
  perPage = 50,
}: WalletTransactionsProps): string => {
  return `${
    COMMON_URLS.QUERY
  }/wallet/${walletId}/transaction/${startTime.toISO()}/${endTime.toISO()}/${perPage}`;
};

export const getTransactionsReq = (
  props: WalletTransactionsProps,
  http: HTTPClient = clientHttp
): Promise<Array<TransactionResponseRaw>> =>
  http.get(getTransactionsUrl(props));

/**
 * @url http://player-transactions.at.casumotest.local:8080/swagger-ui.html#/summaries-public-controller/getSummaryReportFileUsingGET
 */
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
