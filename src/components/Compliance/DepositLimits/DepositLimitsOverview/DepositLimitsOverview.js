// @flow
import * as React from "react";
import * as R from "ramda";
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
  currency: string,
  locale: string,
  t: {
    daily_short: string,
    weekly_short: string,
    monthly_short: string,
    deposit_limits: string,
    pending_change: string,
    pending_change_known_deadline: string,
    pending_remove_all: string,
    remove_all: string,
    remaining_limit: string,
    cancel: string,
  },
  hideRemoveAll: boolean,
  limits: AllLimits,
  pendingLimitChanges?: DepositLimitsAdjustement,
  remainingLimitValue: AllLimitsOnlyValues,
  edit: DepositKinds => void,
  limitCancel: DepositKinds => void,
  add: () => void,
  removeAll: () => void,
};

export function DepositLimitsOverview({ t, ...props }: Props) {
  const allRemoved =
    !R.isNil(props.pendingLimitChanges) &&
    R.anyPass([
      R.allPass([
        R.propEq("daily", null),
        R.propEq("weekly", null),
        R.propEq("monthly", null),
      ]),
      R.isEmpty,
    ])(R.pathOr({}, ["pendingLimitChanges", "value"], props));

  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="t-background-white"
    >
      <Header title={t.deposit_limits}>
        <HeaderButton
          limits={props.limits}
          add={props.add}
          removeAll={props.removeAll}
          t={{ remove_all: t.remove_all }}
          hideRemoveAll={props.hideRemoveAll}
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
                      currency: props.currency,
                      value: parseInt(props.limits[x]),
                    })}{" "}
                    {t[`${x}_short`]}
                  </Text>
                  <Text tag="span" size="sm" style={{ color: "#7967BB" }}>
                    {interpolate(t.remaining_limit, {
                      value: formatCurrency({
                        locale: props.locale,
                        currency: props.currency,
                        value: props.remainingLimitValue[x],
                      }),
                    })}
                  </Text>
                </Flex>
                <MoreIcon className="t-color-grey-light-1" />
              </Flex>
              {!allRemoved && props.pendingLimitChanges?.value?.[x] && (
                <Flex
                  align="center"
                  justify="space-between"
                  spacing="none"
                  className="u-padding-left--sm"
                >
                  <ClockIcon size="sm" className="t-color-caution" />
                  <Text
                    tag="span"
                    size="sm"
                    className="u-margin-left--md t-color-grey-light-1 o-flex--1"
                  >
                    {props.pendingLimitChanges?.effectiveFrom ? (
                      interpolate(t.pending_change_known_deadline, {
                        newLimitValue: formatCurrency({
                          locale: props.locale,
                          currency: props.currency,
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
                            currency: props.currency,
                            value: props.pendingLimitChanges?.value[x],
                          }),
                        })}
                      />
                    )}
                  </Text>
                  <Text
                    tag="span"
                    size="sm"
                    className="t-color-turquoise"
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
      {allRemoved && (
        <Flex
          align="center"
          justify="space-between"
          spacing="none"
          className="u-padding-x--md"
        >
          <ClockIcon size="sm" className="t-color-caution" />
          <Text
            tag="span"
            size="sm"
            className="u-margin-left--md t-color-grey-light-1 o-flex--1"
          >
            <DangerousHtml html={t.pending_remove_all} />
          </Text>
          <Text
            tag="span"
            size="sm"
            className="t-color-turquoise"
            onClick={props.limitCancel}
          >
            {t.cancel}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
