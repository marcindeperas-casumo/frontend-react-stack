// @flow
import { DateTime } from "luxon";
import { pick, path } from "ramda";
import clientHttp from "Lib/http";
import { CURRENCIES } from "Src/constants";
import { URLS as COMMON_URLS } from "Api/api.common";
import type {
  AnnualOverview,
  WalletTotalsProps,
  WalletTransactionsProps,
  FetchAnnualOverviewPdfUrlProps,
  TransactionResponseRaw,
  AmountWithCodeResponseRaw,
  StartingEndBalance,
} from "Models/transactionsBetsHistory";

type HTTPClient = typeof clientHttp;

type GameroundsTotalsProps = {
  startTime: DateTime,
  endTime: DateTime,
};

type WalletTotalsResponseRaw = Array<{
  currency: string,
  awardedBonuses: AmountWithCodeResponseRaw,
  convertedBonuses: AmountWithCodeResponseRaw,
  withdrawals: AmountWithCodeResponseRaw,
  deposits: AmountWithCodeResponseRaw,
}>;

type GameroundsTotalsResponseRaw = Array<{
  currency: string,
  betsAmount: number,
  winningsAmount: number,
}>;

type TotalsResponse = $Diff<AnnualOverview, StartingEndBalance>;

type AnnualOverviewPdfUrlResponseRaw = {
  downloadUrl: string,
};

type GetSummaryUrlProps = {
  date: DateTime,
  currency: $Values<typeof CURRENCIES>,
  periodicity?: "ANNUAL" | "MONTHLY" | "DAILY",
  forPdf?: boolean,
};

export const URLS = {
  HANDSHAKE: "/api/common/handshake",
  SUMMARIES: "/casino-player/player-transactions/api/summaries",
};

const getWalletTotalsUrl = ({
  walletId,
  startTime,
  endTime,
}: WalletTotalsProps): string => {
  const baseUrl = `${COMMON_URLS.QUERY}/wallet/${walletId}/totals`;
  const urlParams = new URLSearchParams();

  urlParams.set("startTime", startTime.toISO());
  urlParams.set("endTime", endTime.toISO());

  return `${baseUrl}?${urlParams.toString()}`;
};

const getGameroundsTotalsUrl = ({
  startTime,
  endTime,
}: GameroundsTotalsProps): string => {
  const baseUrl = `${COMMON_URLS.QUERY}/gamerounds/totals`;
  const urlParams = new URLSearchParams();

  urlParams.set("from", startTime.toMillis());
  urlParams.set("to", endTime.toMillis());

  return `${baseUrl}?${urlParams.toString()}`;
};

export const getWalletTotalsReq = (
  props: WalletTotalsProps,
  http: HTTPClient = clientHttp
): Promise<WalletTotalsResponseRaw> => http.get(getWalletTotalsUrl(props));

export const getGameroundsTotalsReq = (
  props: GameroundsTotalsProps,
  http: HTTPClient = clientHttp
): Promise<GameroundsTotalsResponseRaw> =>
  http.get(getGameroundsTotalsUrl(props));

export const getTotalsReq = async (
  props: WalletTotalsProps,
  http: HTTPClient = clientHttp
): Promise<TotalsResponse> => {
  const responses = await Promise.all([
    getWalletTotalsReq(props, http),
    getGameroundsTotalsReq(pick(["startTime", "endTime"], props), http),
  ]);

  return {
    currency: path([0, 0, "currency"], responses),
    awardedBonusesAmount: path([0, 0, "awardedBonuses", "amount"], responses),
    convertedBonusesAmount: path(
      [0, 0, "convertedBonuses", "amount"],
      responses
    ),
    withdrawalsAmount: path([0, 0, "withdrawals", "amount"], responses),
    depositsAmount: path([0, 0, "deposits", "amount"], responses),
    betsAmount: path([1, 0, "betsAmount"], responses),
    winningsAmount: path([1, 0, "winningsAmount"], responses),
  };
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

export const getAnnualOverviewPdfUrlReq = (
  props: FetchAnnualOverviewPdfUrlProps,
  http: HTTPClient = clientHttp
): Promise<AnnualOverviewPdfUrlResponseRaw> =>
  http.post(`${COMMON_URLS.QUERY}/annual-summary-print`, props);

export const getSummaryUrl = ({
  periodicity = "ANNUAL",
  date,
  currency,
  forPdf = false,
}: GetSummaryUrlProps): string => {
  return `/casino-player/player-transactions/api/summaries/${periodicity}/${date.toFormat(
    "y-MM-dd"
  )}/${currency}${forPdf ? "/PDF" : ""}`;
};
