import * as R from "ramda";
import { TApiToLocalLimitGroupMapping } from "./config.types";

export const apiToLocalLimitGroupMapping: TApiToLocalLimitGroupMapping = {
  loss: "money/LossLimit",
  deposit: "money/DepositLimit",
  wager: "money/WagerLimit",
  affordability: "money/AffordabilityLimit",
  spendingBudget: "money/SpendingBudget",
  loginTime: "time/LoginTimeLimit",
  loginBlock: "time/LoginTimeBlock",
};

export const loginTimeConstraintsPerPeriod = {
  Daily: {
    min: 1,
    max: 23,
  },
  Weekly: {
    min: 1,
    max: 167,
  },
  Monthly: {
    min: 1,
    max: 671,
  },
};

export const loginBlockChoices = R.zip(
  R.times(R.identity, 23),
  R.times(index => `${index}:00`.padStart(5, "0"), 23)
);
