// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon } from "@casumo/cmp-icons";
import { ProgressArc } from "Components/Compliance/ProgressArc";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
} from "Models/playOkay/depositLimits";
import { formatCurrency, interpolate } from "Utils";
import { Header, HeaderButton } from "./Header";
import { limitTypes } from "..";
import "./styles.scss";

type LimitChange = {
  date: number,
  value: number,
};
type Props = {
  locale: string,
  t: {
    daily_short: string,
    weekly_short: string,
    monthly_short: string,
    deposit_limits: string,
    change_in_future: string,
    remove_all: string,
    remaining_limit: string,
  },
  limits: AllLimits,
  pendingLimitChanges: {
    daily?: LimitChange,
    weekly?: LimitChange,
    monthly?: LimitChange,
  },
  remainingLimitValue: AllLimitsOnlyValues,
  edit: DepositKinds => void,
  add: () => void,
  removeAll: () => void,
};

export function DepositLimitsOverview(props: Props) {
  const { t } = props;

  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="u-padding-x--md"
    >
      <Header title={t.deposit_limits}>
        <HeaderButton
          limits={props.limits}
          add={props.add}
          removeAll={props.removeAll}
          t={{ remove_all: t.remove_all }}
        />
      </Header>
      {limitTypes
        .filter(x => props.limits[x])
        .map(x => {
          const progressPercentage =
            100 -
            ((props.remainingLimitValue[x] || 0) / (props.limits[x] || 0)) *
              100;

          return (
            <Flex
              key={x}
              direction="vertical"
              spacing="none"
              className="u-padding-y"
              data-test-id={`limit-${x}`}
              onClick={() => props.edit(x)}
            >
              <Flex align="center" justify="space-between" spacing="none">
                <ProgressArc value={progressPercentage} />
                <Flex className="u-margin-left o-flex--1" direction="vertical">
                  <Text tag="span">
                    {formatCurrency({
                      locale: props.locale,
                      currency: props.limits.currency,
                      value: parseInt(props.limits[x]),
                    })}{" "}
                    {t[`${x}_short`]}
                  </Text>
                  <Text tag="span" size="sm" style={{ color: "#7967BB" }}>
                    {interpolate(t.remaining_limit, {
                      value: formatCurrency({
                        locale: props.locale,
                        currency: props.limits.currency,
                        value: props.remainingLimitValue[x],
                      }),
                    })}
                  </Text>
                </Flex>
                <MoreIcon className="t-color-grey-light-1" />
              </Flex>
              {props.pendingLimitChanges[x] && (
                <Text
                  tag="span"
                  size="sm"
                  className="u-margin-left--xlg t-color-grey-light-1"
                >
                  {interpolate(t.change_in_future, {
                    newLimitValue: formatCurrency({
                      locale: props.locale,
                      currency: props.limits.currency,
                      value: props.pendingLimitChanges[x]?.value,
                    }),
                    limitChangeDate: DateTime.fromMillis(
                      props.pendingLimitChanges[x]?.date
                    ).toLocaleString(),
                  })}
                </Text>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
}
