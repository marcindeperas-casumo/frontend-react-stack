// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { EditIcon } from "@casumo/cmp-icons";
import { interpolate, formatCurrency } from "Utils";
import { LimitYourBudget } from "./LimitYourBudget/LimitYourBudget";

const { useState, useCallback } = React;

type Props = {
  t: {
    limit_your_budget: string,
    use_all_balance: string,
    error_budget_too_low: string,
    error_budget_too_high: string,
    limit_your_time: string,
    get_status_alerts: string,
    want_break_after: string,
    for_how_long: string,
    play: string,
  },
  balance: number,
  currency: string,
  locale: string,
};

type LimitYourBudgetRowType = {
  t: {
    limit_your_budget: string,
  },
  budget: number,
  currency: string,
  locale: string,
  onClickEdit: () => void,
};

export function ConfigurationForm(props: Props) {
  const { currency, locale, t } = props;
  const [screen, setScreen] = useState("form");
  const [budget, setBudget] = useState();
  const onClickEditBudget = useCallback(() => {
    setScreen("limit_your_budget");
  }, [setScreen]);
  const onSubmitBudget = useCallback(
    submittedBudget => {
      setBudget(submittedBudget);
      setScreen("form");
    },
    [setBudget]
  );

  if (screen === "limit_your_budget") {
    return (
      <LimitYourBudget {...props} budget={budget} onSubmit={onSubmitBudget} />
    );
  }

  return (
    <Flex direction="vertical" className="u-height--1/1 u-padding--md">
      <LimitYourBudgetRow
        {...props}
        budget={budget}
        onClickEdit={onClickEditBudget}
      />
    </Flex>
  );
}

function LimitYourBudgetRow(props: LimitYourBudgetRowType) {
  const { budget, currency, locale, t, onClickEdit } = props;

  return (
    <Flex direction="vertical" className="t-border-bottom u-padding-y--md">
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_budget}
      </Text>
      <Flex justify="space-between" align="center">
        <Text tag="span" className="u-font-weight-bold">
          {formatCurrency({ value: budget, currency, locale })}
        </Text>
        <Button
          variant="secondary"
          size="sm"
          className="u-padding"
          onClick={onClickEdit}
        >
          <EditIcon className="t-color-black" />
        </Button>
      </Flex>
    </Flex>
  );
}
