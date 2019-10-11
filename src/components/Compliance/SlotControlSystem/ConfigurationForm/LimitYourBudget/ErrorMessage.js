// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import { interpolate, formatCurrency } from "Utils";
import { isBudgetTooHigh, isBudgetTooLow, isBudgetInvalid } from "../Utils";

type ErrorMessageProps = {
  t: {
    error_budget_too_low: string,
    error_budget_too_high: string,
  },
  balance: number,
  budget: number,
  locale: string,
  currency: string,
};

export function ErrorMessage(props: ErrorMessageProps) {
  const { budget, balance, currency, locale } = props;
  const budgetBalance = { budget, balance };
  const formattedBalance = formatCurrency({
    value: balance,
    currency,
    locale,
  });
  const formattedMinBudget = formatCurrency({
    value: 0.1,
    currency,
    locale,
  });

  if (!isBudgetInvalid(props)) {
    return null;
  }

  return (
    <Text className="t-color-red">
      {isBudgetTooLow(budgetBalance) &&
        interpolate(props.t.error_budget_too_low, {
          budget: formattedMinBudget,
        })}
      {isBudgetTooHigh(budgetBalance) &&
        interpolate(props.t.error_budget_too_high, {
          balance: formattedBalance,
        })}
    </Text>
  );
}
