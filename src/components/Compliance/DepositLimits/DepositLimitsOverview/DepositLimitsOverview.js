// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon } from "@casumo/cmp-icons";
import { ProgressArc } from "Components/Compliance/ProgressArc";
import type { AllLimits, DepositKinds } from "Models/playOkay/depositLimits";
import { Header, HeaderButton } from "./Header";
import { limitTypes } from "..";
import "./styles.scss";

type LimitChange = {
  date: number,
  value: number,
};
type Props = {
  currencySign: string,
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
  limitsUsage: {
    daily: number,
    weekly: number,
    monthly: number,
  },
  edit: DepositKinds => void,
  add: () => void,
  removeAll: () => void,
};

// eslint-disable-next-line fp/no-mutation
DepositLimitsOverview.defaultProps = {
  limitsUsage: {
    daily: 0,
    weekly: 0,
    monthly: 0,
  },
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
          const remainingLimitValue = // $FlowIgnore: props.limits[x] is not null, it got filtered out above
            props.limits[x] - (props.limits[x] / 100) * props.limitsUsage[x];

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
                <ProgressArc value={props.limitsUsage[x]} />
                <Flex className="u-margin-left o-flex--1" direction="vertical">
                  <Text tag="span">
                    {props.currencySign}
                    {props.limits?.[x]} {t[`${x}_short`]}
                  </Text>
                  <Text tag="span" size="sm" style={{ color: "#7967BB" }}>
                    {t.remaining_limit.replace(
                      "{value}",
                      `${props.currencySign}${remainingLimitValue}`
                    )}
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
                  {t.change_in_future
                    .replace(
                      "{newLimitValue}",
                      `${props.currencySign}${props.pendingLimitChanges[x]?.value}`
                    )
                    .replace(
                      "{limitChangeDate}",
                      DateTime.fromMillis(
                        props.pendingLimitChanges[x]?.date
                      ).toLocaleString()
                    )}
                </Text>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
}
