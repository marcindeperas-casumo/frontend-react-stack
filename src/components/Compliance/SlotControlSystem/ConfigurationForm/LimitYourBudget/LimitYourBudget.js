// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import { TextInput } from "Components/Compliance/TextInput";
import { interpolate, formatCurrency, getSymbolForCurrency } from "Utils";
import "./LimitYourBudget.scss";

const { useCallback, useState } = React;

type Props = {
  t: {
    limit_your_budget: string,
    use_all_balance: string,
    error_budget_too_low: string,
    error_budget_too_high: string,
  },
  budget?: number,
  balance: number,
  currency: string,
  locale: string,
  onSubmit: (budget: number) => void,
};

export function LimitYourBudget(props: Props) {
  const { balance, currency, t, locale, onSubmit } = props;
  const [budget, setBudget] = useState(props.budget);
  const parsedBudget = parseFloat(budget);
  const budgetBalance = { balance, budget: parsedBudget };
  const formattedBalance = formatCurrency({
    value: balance,
    currency,
    locale,
  });
  const onChange = useCallback(
    e => {
      setBudget(e.currentTarget.value);
    },
    [setBudget]
  );

  return (
    <Flex
      direction="vertical"
      className={classNames(
        "u-padding--md u-height--1/1 t-background-white c-scs__limit-your-budget",
        budget &&
          isBudgetWrong(budgetBalance) &&
          "c-scs__limit-your-budget--error"
      )}
    >
      <Text tag="label" size="sm" className="u-margin-bottom--md">
        <strong>{t.limit_your_budget}</strong>
      </Text>
      <Flex align="center">
        <TextInput
          currencySign={getSymbolForCurrency({ locale, currency })}
          onChange={onChange}
          value={budget}
          className="c-scs__limit-your-budget__field"
        />
        <Button
          disabled={isBudgetWrong(budgetBalance)}
          variant="primary"
          size="sm"
          className="u-width--1/4 u-margin-left--md u-padding--md t-box-shadow"
          onClick={() => onSubmit(parsedBudget)}
        >
          <ArrowRightIcon size="sm" />
        </Button>
      </Flex>
      <ErrorMessage
        {...props}
        budget={parsedBudget}
        formattedBalance={formattedBalance}
      />
      <Button
        variant="secondary"
        className="u-margin-top--xlg"
        onClick={() => onSubmit(balance)}
      >
        <span className="t-color-black">
          {interpolate(t.use_all_balance, { balance: formattedBalance })}
        </span>
      </Button>
    </Flex>
  );
}

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

function ErrorMessage(props: ErrorMessageProps) {
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

  if (!isBudgetWrong(props)) {
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

function isBudgetTooLow({ budget }: { budget: number }) {
  return budget < 0.1;
}

function isBudgetTooHigh({
  budget,
  balance,
}: {
  budget: number,
  balance: number,
}) {
  return budget > balance;
}

function isBudgetWrong(props: { budget: number, balance: number }) {
  return isNaN(props.budget) || isBudgetTooLow(props) || isBudgetTooHigh(props);
}
