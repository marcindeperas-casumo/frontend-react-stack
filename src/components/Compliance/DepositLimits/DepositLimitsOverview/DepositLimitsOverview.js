// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon, ClockIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { ProgressArc } from "Components/Compliance/ProgressArc";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitsAdjustement,
} from "Models/playOkay/depositLimits";
import { formatCurrency, interpolate } from "Utils";
import { Header, HeaderButton } from "./Header";
import { limitTypes } from "..";
import "./styles.scss";

type Props = {
  locale: string,
  t: {
    daily_short: string,
    weekly_short: string,
    monthly_short: string,
    deposit_limits: string,
    pending_change: string,
    pending_change_known_deadline: string,
    remove_all: string,
    remaining_limit: string,
    cancel: string,
  },
  limits: AllLimits,
  pendingLimitChanges?: DepositLimitsAdjustement,
  remainingLimitValue: AllLimitsOnlyValues,
  edit: DepositKinds => void,
  limitCancel: DepositKinds => void,
  add: () => void,
  removeAll: () => void,
};

export function DepositLimitsOverview({ t, ...props }: Props) {
  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
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
              className="u-padding-y t-background-white u-padding-x--md"
            >
              <Flex
                align="center"
                justify="space-between"
                spacing="none"
                onClick={() => props.edit(x)}
                data-test-id={`limit-${x}`}
              >
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
              {props.pendingLimitChanges?.value?.[x] && (
                <Flex
                  align="center"
                  justify="space-between"
                  spacing="none"
                  className="u-padding-left--sm"
                >
                  <ClockIcon size="sm" style={{ color: "#FFCA30" }} />
                  <Text
                    tag="span"
                    size="sm"
                    className="u-margin-left--md t-color-grey-light-1 o-flex--1"
                  >
                    {props.pendingLimitChanges?.effectiveFrom ? (
                      interpolate(t.pending_change_known_deadline, {
                        newLimitValue: formatCurrency({
                          locale: props.locale,
                          currency: props.limits.currency,
                          value: props.pendingLimitChanges?.value[x],
                        }),
                        limitChangeDate: DateTime.fromISO(
                          props.pendingLimitChanges?.effectiveFrom
                        )
                          .setLocale(props.locale)
                          .toLocaleString(),
                      })
                    ) : (
                      <DangerousHtml
                        html={interpolate(t.pending_change, {
                          newLimitValue: formatCurrency({
                            locale: props.locale,
                            currency: props.limits.currency,
                            value: props.pendingLimitChanges?.value[x],
                          }),
                        })}
                      />
                    )}
                  </Text>
                  <Text
                    tag="span"
                    size="sm"
                    style={{ color: "#0CD0CD" }}
                    onClick={props.limitCancel}
                    data-test-id={`pending-limit-${x}`}
                  >
                    {t.cancel}
                  </Text>
                </Flex>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
}
