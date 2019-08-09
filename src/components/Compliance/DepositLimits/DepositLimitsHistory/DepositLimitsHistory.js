// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { formatCurrency, interpolate } from "Utils";
import type { DepositLimitsHistoryType } from "Models/playOkay/depositLimits";
import { LimitChangeIcon } from "../DepositLimitsSummary/LimitChangeIcon";
import "./depositLimitsHistory.scss";

type Props = {
  t: {
    daily_adjusted: string,
    weekly_adjusted: string,
    monthly_adjusted: string,
    daily_removed: string,
    weekly_removed: string,
    monthly_removed: string,
    title: string,
    history: string,
  },
  locale: string,
  currency: string,
  getLimitsHistory: void => void,
  fetchTranslations: void => void,
  history: DepositLimitsHistoryType,
};

export function DepositLimitsHistory({ t, ...props }: Props) {
  React.useEffect(() => {
    props.getLimitsHistory();
    props.fetchTranslations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.history || !t) {
    return null;
  }

  return (
    <Flex
      direction="vertical"
      align="stretch"
      spacing="none"
      className="u-padding--md u-height--1/1 t-background-white"
    >
      <Flex
        align="center"
        justify="space-between"
        spacing="none"
        className="u-padding--md"
      >
        <Text tag="span" className="u-font-weight-bold o-flex--1">
          {t.history}
        </Text>
      </Flex>

      <Flex direction="vertical" align="center">
        {props.history.map(historyItem => {
          const limitsValues = R.pipe(
            R.toPairs,
            R.map(([limit, value], i) => (
              <Text
                tag="span"
                key={limit}
                className="u-padding-top u-padding-x--md"
              >
                {interpolate(
                  t[value ? `${limit}_adjusted` : `${limit}_removed`],
                  {
                    value: formatCurrency({
                      locale: props.locale,
                      currency: props.currency,
                      value,
                    }),
                  }
                )}
              </Text>
            ))
          )(historyItem.changes);

          return (
            <Flex
              key={historyItem.id}
              direction="vertical"
              spacing="none"
              align="stretch"
              className="c-deposit-limits-history__container u-width--1/1 u-margin-bottom--md"
            >
              <Text
                tag="span"
                size="sm"
                className="o-flex__item-align--end t-color-grey-light-1"
              >
                {DateTime.fromISO(historyItem.timestamp)
                  .setLocale(props.locale)
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </Text>

              <Flex
                direction="vertical"
                spacing="none"
                className="t-background-grey-light-2 u-padding-y--md c-deposit-limits-history__limit"
              >
                <Flex
                  justify="space-between"
                  align="center"
                  className="u-padding-bottom u-padding-x--md c-deposit-limits-history__separator"
                >
                  <Text tag="span" className="u-font-weight-black">
                    {t.title}
                  </Text>
                  <LimitChangeIcon change={historyItem.type} />
                </Flex>
                {limitsValues}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
