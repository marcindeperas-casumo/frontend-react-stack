import { TCurrencyCode } from "Src/constants";

type TLowBalancesThresholds = {
  // eslint-disable-next-line no-unused-vars
  [key in TCurrencyCode]: number;
};

export const LOW_BALANCES_THRESHOLDS: TLowBalancesThresholds = {
  EUR: 10,
  GBP: 8.49,
  DKK: 74.41,
  NOK: 98.78,
  SEK: 101.09,
  CAD: 14.41,
  NZD: 16.61,
  INR: 873,
  USD: 11.56,
};
