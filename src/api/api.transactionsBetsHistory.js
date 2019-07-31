// @flow
import { DateTime } from "luxon";
import { pick, path, head, last, sortBy } from "ramda";
import clientHttp from "Lib/http";
import { URLS } from "Api/api.common";
import type {
  AnnualOverview,
  WalletTotalsProps,
  FetchAnnualOverviewPdfUrlProps,
} from "Models/transactionsBetsHistory";

type HTTPClient = typeof clientHttp;

type GameroundsTotalsProps = {
  startTime: DateTime,
  endTime: DateTime,
};

type TransactionsProps = WalletTotalsProps & {
  perPage?: number,
};

type AmountWithCodeResponseRaw = {
  amount: number,
  iso4217CurrencyCode: string,
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

type TransactionResponseRaw = {
  balanceBefore: AmountWithCodeResponseRaw,
  balanceAfter: AmountWithCodeResponseRaw,
  delta: AmountWithCodeResponseRaw,
  details: Object,
  fee: AmountWithCodeResponseRaw,
  id: string,
  paymentMethodId: string,
  reason: string,
  sequenceNumber: number,
  state: string,
  timestamp: number,
  walletId: string,
  walletUpdateSource: string,
  withdrawalLocked: boolean,
};

type TotalsResponse = $Diff<AnnualOverview, StartingEndBalanceResponse>;

type StartingEndBalanceResponse = {
  startingBalanceAmount: number,
  endBalanceAmount: number,
};

type AnnualOverviewPdfUrlResponseRaw = {
  downloadUrl: string,
};

const getWalletTotalsUrl = ({
  walletId,
  startTime,
  endTime,
}: WalletTotalsProps): string => {
  const baseUrl = `${URLS.QUERY}/wallet/${walletId}/totals`;
  const urlParams = new URLSearchParams();

  urlParams.set("startTime", startTime.toISO());
  urlParams.set("endTime", endTime.toISO());

  return `${baseUrl}?${urlParams.toString()}`;
};

const getGameroundsTotalsUrl = ({
  startTime,
  endTime,
}: GameroundsTotalsProps): string => {
  const baseUrl = `${URLS.QUERY}/gamerounds/totals`;
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
}: TransactionsProps): string => {
  return `${
    URLS.QUERY
  }/wallet/${walletId}/transaction/${startTime.toISO()}/${endTime.toISO()}/${perPage}`;
};

export const getTransactionsReq = (
  props: TransactionsProps,
  http: HTTPClient = clientHttp
): Promise<Array<TransactionResponseRaw>> =>
  http.get(getTransactionsUrl(props));

/**
 * This method uses transactions endpoint and is short-term, intended for Spain audit.
 * It would not be feasible to fetch all transactions in previous years just to get
 * wallet balance at some point in time.
 * After Aug 19 2019 a proper solution will be delivered.
 *
 */
export const getStartingEndBalanceReq = async (
  props: WalletTotalsProps,
  http: HTTPClient = clientHttp
): Promise<StartingEndBalanceResponse> => {
  const transactionsResp = await getTransactionsReq(
    { ...props, perPage: 10000 },
    http
  );
  // API returns a sorted list, from the latest transaction to the oldest
  return {
    startingBalanceAmount: path(
      ["balanceBefore", "amount"],
      last(transactionsResp)
    ),
    endBalanceAmount: path(["balanceAfter", "amount"], head(transactionsResp)),
  };
};

export const getOverviewReq = async (
  props: WalletTotalsProps,
  http: HTTPClient = clientHttp
): Promise<AnnualOverview> => {
  const [totalsResp, startingEndBalanceResp] = await Promise.all([
    getTotalsReq(props, http),
    getStartingEndBalanceReq(props, http),
  ]);

  return {
    ...totalsResp,
    ...startingEndBalanceResp,
  };
};

export const getAnnualOverviewPdfUrlReq = (
  props: FetchAnnualOverviewPdfUrlProps,
  http: HTTPClient = clientHttp
): Promise<AnnualOverviewPdfUrlResponseRaw> =>
  http.post(`${URLS.QUERY}/annual-summary-print`, props);
