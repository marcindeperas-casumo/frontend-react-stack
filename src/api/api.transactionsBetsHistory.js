// @flow
import { DateTime } from "luxon";
import { pick, path } from "ramda";
import clientHttp from "Lib/http";

type HTTPClient = typeof clientHttp;

type WalletTotalsProps = {
  walletId: string,
  startTime: DateTime,
  endTime: DateTime,
};

type GameroundsTotalsProps = {
  startTime: DateTime,
  endTime: DateTime,
};

type TotalsProps = WalletTotalsProps;

type AmountWithCodeResponseRaw = {
  amount: number,
  iso4217CurrencyCode: string,
};

type WalletTotalsResponseRaw = Array<{
  currency: string,
  bonuses: AmountWithCodeResponseRaw,
  withdrawals: AmountWithCodeResponseRaw,
  deposits: AmountWithCodeResponseRaw,
}>;

type GameroundsTotalsResponseRaw = Array<{
  currency: string,
  betsAmount: number,
  winningsAmount: number,
}>;

type TotalsResponse = {
  currency: string,
  betsAmount: number,
  winningsAmount: number,
  bonusesAmount: number,
  withdrawalsAmount: number,
  depositsAmount: number,
};

export const getWalletTotalsUrl = ({
  walletId,
  startTime,
  endTime,
}: WalletTotalsProps): string => {
  const baseUrl = `/api/common/query/wallet/${walletId}/totals`;
  const urlParams = new URLSearchParams();

  urlParams.set("startTime", startTime.toISO());
  urlParams.set("endTime", endTime.toISO());

  return `${baseUrl}?${urlParams.toString()}`;
};

export const getGameroundsTotalsUrl = ({
  startTime,
  endTime,
}: GameroundsTotalsProps): string => {
  const baseUrl = `/api/common/query/gamerounds/totals`;
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
  props: TotalsProps,
  http: HTTPClient = clientHttp
): Promise<TotalsResponse> => {
  const responses = await Promise.all([
    getWalletTotalsReq(props, http),
    getGameroundsTotalsReq(pick(["startTime", "endTime"], props), http),
  ]);

  return {
    currency: path([0, 0, "currency"], responses),
    bonusesAmount: path([0, 0, "bonuses", "amount"], responses),
    withdrawalsAmount: path([0, 0, "withdrawals", "amount"], responses),
    depositsAmount: path([0, 0, "deposits", "amount"], responses),
    betsAmount: path([1, 0, "betsAmount"], responses),
    winningsAmount: path([1, 0, "winningsAmount"], responses),
  };
};
