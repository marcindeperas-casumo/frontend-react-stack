import Text from "@casumo/cmp-text";
import * as React from "react";
import { TCurrencyCode } from "Src/constants";
import { interpolate, formatCurrency } from "Utils";
import { isBudgetTooHigh, isBudgetTooLow, isBudgetInvalid } from "../Utils";

type ErrorMessageProps = {
  t: {
    error_budget_too_low: string;
    error_budget_too_high: string;
  };
  balance: number;
  budget: number;
  locale: string;
  currency: TCurrencyCode;
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
    value: 0,
    currency,
    locale,
  });
  const textProps = {
    size: "sm",
    className: "text-red-30 u-margin-bottom--3xlg@tablet",
  };

  if (!isBudgetInvalid(props) || isNaN(budget)) {
    return <Text {...textProps}>&nbsp;</Text>;
  }

  return (
    <Text {...textProps}>
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
