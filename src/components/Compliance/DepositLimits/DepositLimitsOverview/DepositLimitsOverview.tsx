// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DepositLimitsSuspendAccount } from "Components/Compliance/DepositLimits/DepositLimitsSuspendAccount";
import { DepositLimitsHistoryContainer } from "Components/Compliance/DepositLimits/DepositLimitsHistory";
import type {
  DepositKinds,
  DepositLimitsSelected,
  PendingDepositLimitsChangesSelected,
} from "Models/playOkay/depositLimits";
import {
  LimitHeader,
  LimitHeaderButton,
} from "Components/Compliance/LimitHeader";
import { PendingChanges } from "./PendingChanges";
import { SinglePeriodLimitOverview } from "./SinglePeriodLimitOverview";
import DepositLimitsIcon from "./depositLimits.svg";
import { SectionHeader } from "./SectionHeader";
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
    active_limits_section_title: string,
    more_limits_section_title: string,
    adjust_limit: string,
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
      className="c-deposit-limits__container"
    >
      <SectionHeader>
        {props.limits.length
          ? t.active_limits_section_title
          : t.more_limits_section_title}
      </SectionHeader>
      <Flex
        direction="vertical"
        align="stretch"
        justify="space-between"
        spacing="none"
        className="t-border-r--none t-border-r--md@tablet t-border-r--md@desktop u-overflow--hidden u-margin-bottom--2xlg"
      >
        <LimitHeader
          variesForDesktop
          title={t.deposit_limits}
          icon={<DepositLimitsIcon />}
        >
          {shouldShowAddButton && (
            <LimitHeaderButton variesForDesktop onClick={props.add}>
              {t.add}
            </LimitHeaderButton>
          )}
          {shouldShowRemoveButton && (
            <LimitHeaderButton variesForDesktop onClick={props.removeAll}>
              {t.remove_all}
            </LimitHeaderButton>
          )}
        </LimitHeader>
        <Flex className="c-deposit-limits__limits-list">
          {props.limits.map((x, i) => {
            const shouldRenderSeparator = props.limits.length - 2 >= i;
            const progressPercentage =
              100 - ((x.remaining || 0) / x.value) * 100;

            return (
              <SinglePeriodLimitOverview
                key={x.limitKind}
                data-test-id={`limit-${x.limitKind}`}
                t={t}
                progressPercentage={progressPercentage}
                shouldRenderSeparator={shouldRenderSeparator}
                currency={props.currency}
                locale={props.locale}
                // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                onClick={() => props.edit(x.limitKind)}
                {...x}
              />
            );
          })}
        </Flex>
        <PendingChanges
          t={t}
          currency={props.currency}
          locale={props.locale}
          pendingChanges={props.pendingChanges}
          allRemoved={props.allRemoved}
          limitCancel={props.limitCancel}
        />
      </Flex>

      {props.limits.length !== 0 && (
        <SectionHeader>{t.more_limits_section_title}</SectionHeader>
      )}

      <DepositLimitsSuspendAccount
        t={t}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '() => void' is not assignable to type 'void'... Remove this comment to see the full error message
        showOldSuspendAccountView={props.showOldSuspendAccountView}
        className="u-width--1/2@desktop"
      />
      {/* @ts-expect-error ts-migrate(2740) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message */}
      <DepositLimitsHistoryContainer />
    </Flex>
  );
}
