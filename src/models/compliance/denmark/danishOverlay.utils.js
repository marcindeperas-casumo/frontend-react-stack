import { minFirstDepositLimit, maxFirstDepositLimit } from "./constants";

export const limitInRange = amount => {
  return amount >= minFirstDepositLimit && amount <= maxFirstDepositLimit;
};

export const isLimitMaxed = amount => amount >= maxFirstDepositLimit;
