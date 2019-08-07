// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { formatCurrency, interpolate } from "Utils";
import type { DepositLimitsHistoryType } from "Models/playOkay/depositLimits";
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
        )(historyItem.diff);

        return (
          <Flex key={historyItem.id} direction="vertical" spacing="none">
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
              className="t-background-grey-light-2 u-padding-y--md c-deposit-limits-history__container"
            >
              <Text
                tag="span"
                className="u-font-weight-black u-padding-bottom u-padding-x--md c-deposit-limits-history__separator"
              >
                {t.title}
              </Text>
              {limitsValues}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
