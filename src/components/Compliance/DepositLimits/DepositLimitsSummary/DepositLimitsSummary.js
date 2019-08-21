// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { MoreIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import {
  diffLimits,
  checkIfConditionsApply,
  type AllLimits,
  type DepositKinds,
  type DepositLimitPreadjust,
} from "Models/playOkay/depositLimits";
import { LimitChangeIcon } from "./LimitChangeIcon";
import { AdditionalConditions } from "./AdditionalConditions";
import { limitTypes } from "..";

type Props = {
  currency: string,
  locale: string,
  t: {
    summary_title: string,
    save_limits_button_conditions: string,
    save_limits_button: string,
    daily: string,
    weekly: string,
    monthly: string,
    daily_removed: string,
    weekly_removed: string,
    monthly_removed: string,
    approval_required_for_subsequent_increases: string,
    approval_required_for_increase: string,
    responsible_gambling_test_required: string,
    decrease_effective_immediately: string,
    revocation_allowed: string,
  },
  newLimits: AllLimits,
  currentLimits: AllLimits,
  edit: DepositKinds => void,
  confirmLimitsAdjust: () => void,
  fetchTranslations: () => void,
  preadjust: DepositLimitPreadjust,
};

export function DepositLimitsSummary({ t, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const limitsDiff = diffLimits({
    before: props.currentLimits,
    after: props.newLimits,
  });
  const [req, setReq] = React.useState(false);

  const SubmitButton = (
    <Button
      data-test-id="submit-button"
      variant="primary"
      className="u-padding-y--md"
      disabled={req}
      loading={req}
      onClick={() => {
        setReq(true);
        props.confirmLimitsAdjust();
      }}
    >
      {checkIfConditionsApply(limitsDiff)
        ? t.save_limits_button_conditions
        : t.save_limits_button}
    </Button>
  );

  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="u-padding--md u-height--1/1 t-background-white c-deposit-limits-container"
    >
      <Text className="u-font-weight-bold">{t.summary_title}</Text>
      {limitTypes.map(x => (
        <Flex
          key={x}
          data-test-id={`limit-${x}`}
          align="center"
          onClick={() => props.edit(x)}
        >
          <LimitChangeIcon change={limitsDiff[x]} />
          <Flex
            align="center"
            justify="space-between"
            spacing="none"
            className="o-flex--1 t-border-bottom u-padding-y--lg"
          >
            <Flex direction="vertical">
              {props.newLimits[x] && (
                <Text tag="span" className="u-font-weight-bold">
                  {formatCurrency({
                    locale: props.locale,
                    currency: props.currency,
                    value: props.newLimits[x],
                  })}
                </Text>
              )}
              <Text tag="span">
                {props.newLimits[x] ? t[x] : t[`${x}_removed`]}
              </Text>
            </Flex>
            <MoreIcon className="t-color-grey-light-1" />
          </Flex>
        </Flex>
      ))}
      <Flex.Block />
      {checkIfConditionsApply(limitsDiff) ? (
        <Flex
          direction="vertical"
          className="t-border-r u-padding-y--lg u-padding-x--md"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <AdditionalConditions {...props.preadjust} t={t} />
          {SubmitButton}
        </Flex>
      ) : (
        SubmitButton
      )}
    </Flex>
  );
}
