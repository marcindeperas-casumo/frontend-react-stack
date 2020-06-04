// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { EditIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";

type LimitYourBudgetRowType = {
  t: {
    limit_your_budget: string,
  },
  budget: number,
  currency: string,
  locale: string,
  onClickEdit: () => void,
};

export function LimitYourBudgetRow(props: LimitYourBudgetRowType) {
  const { budget, currency, locale, t, onClickEdit } = props;

  return (
    <Flex
      direction="vertical"
      className="t-border-bottom u-padding-y--md u-margin-bottom--md"
    >
      <Text tag="label" className="u-font-weight-bold u-margin-y--lg">
        {t.limit_your_budget}
      </Text>
      <Flex justify="space-between" align="center">
        <Text tag="span" className="u-font-weight-bold">
          {formatCurrency({ value: budget, currency, locale })}
        </Text>
        <ButtonSecondary size="sm" className="u-padding" onClick={onClickEdit}>
          <EditIcon className="t-color-black" />
        </ButtonSecondary>
      </Flex>
    </Flex>
  );
}
