// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { MoreIcon, ClockIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import { ProgressArc } from "Components/Compliance/ProgressArc";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitsAdjustment,
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
    pending_increase: string,
    pending_remove_all: string,
    remove_all: string,
    remaining_limit: string,
    cancel_pending_increases: string,
    cancel_pending_remove_all: string,
  },
  hideRemoveAll: boolean,
  limits: AllLimits,
  pendingLimitChanges?: DepositLimitsAdjustment,
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
  const hasPendingChanges = R.anyPass([
    R.propIs(Number, "daily"),
    R.propIs(Number, "weekly"),
    R.propIs(Number, "monthly"),
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
              spacing="none"
              className="u-padding-y t-background-white u-padding-x--md"
              align="center"
              justify="space-between"
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
                <Text tag="span" size="sm" className="t-color-turquoise">
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
          );
        })}
      {(hasPendingChanges || allRemoved) && (
        <Flex
          direction="vertical"
          align="stretch"
          justify="space-between"
          spacing="none"
          className="u-padding-x--md u-padding-y--lg"
        >
          <Flex align="center" justify="space-between" spacing="none">
            <ClockIcon size="sm" className="t-color-caution" />
            <Text
              tag="span"
              size="sm"
              className="u-margin-left--md t-color-grey-dark-1 o-flex--1"
            >
              {allRemoved ? (
                <DangerousHtml html={t.pending_remove_all} />
              ) : (
                <Text
                  tag="span"
                  size="sm"
                  className="t-color-warning u-font-weight-bold"
                >
                  {t.pending_increase}{" "}
                </Text>
              )}
              {!allRemoved &&
                limitTypes
                  .filter(x => R.path(["value", x], props.pendingLimitChanges))
                  .map(
                    x =>
                      `${formatCurrency({
                        locale: props.locale,
                        currency: props.currency,
                        value: props.pendingLimitChanges?.value[x],
                      })} ${t[`${x}_short`]}`
                  )
                  .join(", ")}
            </Text>
          </Flex>
          <Button
            variant="secondary"
            className="o-flex--1 u-margin-top--lg"
            data-test-id="cancel-pending-limit-change"
            onClick={props.limitCancel}
          >
            {allRemoved
              ? t.cancel_pending_remove_all
              : t.cancel_pending_increases}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
