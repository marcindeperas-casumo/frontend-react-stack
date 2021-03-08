import Flex from "@casumo/cmp-flex";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import { ArrowRightIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import * as React from "react";
import { TextInput } from "Components/Compliance/TextInput";
import { interpolate, formatCurrency, getSymbolForCurrency } from "Utils";
import { isBudgetInvalid } from "../Utils";
import { ErrorMessage } from "./ErrorMessage";
import "./LimitYourBudget.scss";

const { useCallback, useState } = React;

type Props = {
  t: {
    limit_your_budget: string;
    use_all_balance: string;
    error_budget_too_low: string;
    error_budget_too_high: string;
  };
  budget?: number;
  balance: number;
  currency: string;
  locale: string;
  onSubmit: (budget: number) => void;
};

export function LimitYourBudget(props: Props) {
  const { balance, currency, t, locale, onSubmit } = props;
  const [budget, setBudget] = useState(props.budget);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
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
          isBudgetInvalid(budgetBalance) &&
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
        <ButtonPrimary
          isDisabled={isBudgetInvalid(budgetBalance)}
          size="md"
          className="u-width--1/4 u-margin-left--md u-padding--md"
          onClick={() => onSubmit(parsedBudget)}
        >
          <ArrowRightIcon size="sm" />
        </ButtonPrimary>
      </Flex>
      <ErrorMessage
        {...props}
        budget={parsedBudget}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ budget: number; formattedBalance: string; ... Remove this comment to see the full error message
        formattedBalance={formattedBalance}
      />
      <ButtonSecondary
        size="sm"
        className="u-margin-top--xlg u-margin-top--3xlg@tablet"
        onClick={() => onSubmit(balance)}
      >
        <span className="t-color-black">
          {interpolate(t.use_all_balance, { balance: formattedBalance })}
        </span>
      </ButtonSecondary>
    </Flex>
  );
}
