import { TCurrencyCode } from "Src/constants";

type TLowBalancesThresholds = {
  // eslint-disable-next-line no-unused-vars
  [key in TCurrencyCode]: number;
};

export const LOW_BALANCES_THRESHOLDS: TLowBalancesThresholds = {
  EUR: 10,
  GBP: 10,
  DKK: 10,
  NOK: 10,
  SEK: 10,
  CAD: 10,
  NZD: 10,
  INR: 10,
  USD: 10,
};
