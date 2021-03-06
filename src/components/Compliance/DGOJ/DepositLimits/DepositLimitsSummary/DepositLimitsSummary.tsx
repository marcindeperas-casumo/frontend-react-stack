import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { MoreIcon } from "@casumo/cmp-icons";
import * as R from "ramda";
import * as React from "react";
import { formatCurrency } from "Utils";
import {
  diffLimits,
  checkIfConditionsApply,
  getChangedLimitsValues,
} from "Models/playOkay/dgojDepositLimits";
import type {
  AllLimits,
  DepositKinds,
  DepositLimitPreadjust,
} from "Models/playOkay/dgojDepositLimits";
import { TCurrencyCode } from "Src/constants";
import { limitTypes } from "..";
import { LimitChangeIcon } from "./LimitChangeIcon";
import { AdditionalConditions } from "./AdditionalConditions";

type Props = {
  currency: TCurrencyCode;
  locale: string;
  t: {
    summary_title: string;
    save_limits_button_conditions: string;
    save_limits_button: string;
    daily: string;
    weekly: string;
    monthly: string;
    daily_removed: string;
    weekly_removed: string;
    monthly_removed: string;
    approval_required_for_subsequent_increases: string;
    approval_required_for_increase: string;
    responsible_gambling_test_required: string;
    decrease_effective_immediately: string;
    cancellation_allowed: string;
  };
  newLimits: AllLimits;
  currentLimits: AllLimits;
  edit: (depositKind: DepositKinds) => void;
  confirmLimitsAdjust: () => void;
  fetchTranslations: () => void;
  preadjust: DepositLimitPreadjust;
};

export function DepositLimitsSummary({ t, ...props }: Props) {
  React.useEffect(() => {
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const beforeAfterLimits = {
    before: props.currentLimits,
    after: props.newLimits,
  };
  const limitsDiff = diffLimits(beforeAfterLimits);
  const limitsUnchanged = R.isEmpty(getChangedLimitsValues(beforeAfterLimits));

  const [req, setReq] = React.useState(false);
  const flexChildWidth = "u-width--1/2@desktop";

  const SubmitButton = (
    <ButtonPrimary
      size="md"
      data-test-id="submit-button"
      className="u-padding-y--md u-width--full"
      isDisabled={req || limitsUnchanged}
      isLoading={req}
      onClick={() => {
        setReq(true);
        props.confirmLimitsAdjust();
      }}
    >
      {checkIfConditionsApply(limitsDiff)
        ? t.save_limits_button_conditions
        : t.save_limits_button}
    </ButtonPrimary>
  );

  return (
    <Flex
      direction="vertical"
      justify="space-between"
      spacing="none"
      className="o-flex-align--center@desktop u-padding--md u-padding--2xlg@tablet u-padding--2xlg@desktop u-height--full bg-white c-deposit-limits-container"
    >
      <Text className={`u-font-weight-bold ${flexChildWidth}`}>
        {t.summary_title}
      </Text>
      {limitTypes.map(x => (
        <Flex
          key={x}
          data-test-id={`limit-${x}`}
          align="center"
          onClick={() => props.edit(x)}
          className={flexChildWidth}
        >
          <LimitChangeIcon change={limitsDiff[x]} />
          <Flex
            align="center"
            justify="space-between"
            spacing="none"
            className="o-flex--1 t-border-bottom border-grey-5 u-padding-y--lg"
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
            <MoreIcon className="text-grey-5" />
          </Flex>
        </Flex>
      ))}
      <Flex.Block />
      {checkIfConditionsApply(limitsDiff) ? (
        <Flex
          direction="vertical"
          className={`t-border-r bg-grey-0 u-padding-y--lg u-padding-x--md ${flexChildWidth}`}
        >
          <AdditionalConditions {...props.preadjust} t={t} />
          {SubmitButton}
        </Flex>
      ) : (
        <div className={flexChildWidth}>{SubmitButton}</div>
      )}
    </Flex>
  );
}
