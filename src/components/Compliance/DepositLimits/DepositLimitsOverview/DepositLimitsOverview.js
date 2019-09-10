// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import { ProgressArc } from "Components/Compliance/ProgressArc";
import { DepositLimitsSuspendAccount } from "Components/Compliance/DepositLimits/DepositLimitsSuspendAccount";
import { DepositLimitsHistoryContainer } from "Components/Compliance/DepositLimits/DepositLimitsHistory";
import type {
  DepositKinds,
  DepositLimitsSelected,
  PendingDepositLimitsChangesSelected,
} from "Models/playOkay/depositLimits";
import { formatCurrency, interpolate } from "Utils";
import { LimitHeader } from "Components/Compliance/LimitHeader";
import { PendingChanges } from "./PendingChanges";
import DepositLimitsIcon from "./depositLimits.svg";
import "./styles.scss";

type Props = PendingDepositLimitsChangesSelected & {
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
    add: string,
    remaining_limit: string,
    cancel_pending_increases: string,
    cancel_pending_remove_all: string,
    suspend_account: string,
  },
  canIncreaseLimits: boolean,
  limits: DepositLimitsSelected,
  edit: DepositKinds => void,
  limitCancel: () => void,
  add: () => void,
  removeAll: () => void,
  showOldSuspendAccountView: () => void,
};
export function DepositLimitsOverview(props: Props) {
  const { t } = props;
  const shouldShowAddButton = props.limits.length !== 3;
  const shouldShowRemoveButton =
    !shouldShowAddButton && props.canIncreaseLimits;

  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="t-background-grey-light-2"
    >
      <Flex
        direction="vertical"
        align="stretch"
        justify="space-between"
        spacing="none"
        className="u-padding-bottom--2xlg"
      >
        <LimitHeader title={t.deposit_limits} icon={<DepositLimitsIcon />}>
          {shouldShowAddButton && (
            <Button onClick={props.add} variant="secondary">
              {t.add}
            </Button>
          )}
          {shouldShowRemoveButton && (
            <Button onClick={props.removeAll} variant="secondary">
              {t.remove_all}
            </Button>
          )}
        </LimitHeader>
        {props.limits.map((x, i) => {
          const shouldRenderSeparator = props.limits.length - 2 >= i;
          const progressPercentage = 100 - ((x.remaining || 0) / x.value) * 100;

          return (
            <Flex
              key={x.limitKind}
              spacing="none"
              className="t-background-white u-padding-x--md"
              align="center"
              onClick={() => props.edit(x.limitKind)}
              data-test-id={`limit-${x.limitKind}`}
            >
              <ProgressArc value={progressPercentage} />
              <Flex
                align="center"
                justify="space-between"
                className={classNames(
                  "u-margin-left u-padding-y--md o-flex--1",
                  shouldRenderSeparator && "t-border-bottom"
                )}
              >
                <Flex direction="vertical">
                  <Text tag="span">
                    {formatCurrency({
                      locale: props.locale,
                      currency: props.currency,
                      value: x.value,
                    })}{" "}
                    {t[`${x.limitKind}_short`]}
                  </Text>
                  <Text tag="span" size="sm" className="t-color-turquoise">
                    {interpolate(t.remaining_limit, {
                      value: formatCurrency({
                        locale: props.locale,
                        currency: props.currency,
                        value: x.remaining,
                      }),
                    })}
                  </Text>
                </Flex>
                <DirectionRightIcon className="t-color-grey-light-2" />
              </Flex>
            </Flex>
          );
        })}
        <PendingChanges
          t={t}
          currency={props.currency}
          locale={props.locale}
          pendingChanges={props.pendingChanges}
          allRemoved={props.allRemoved}
          limitCancel={props.limitCancel}
        />
      </Flex>

      <DepositLimitsSuspendAccount
        t={t}
        showOldSuspendAccountView={props.showOldSuspendAccountView}
      />
      <DepositLimitsHistoryContainer />
    </Flex>
  );
}
