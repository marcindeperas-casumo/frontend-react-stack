// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { ClockIcon } from "@casumo/cmp-icons";
import DangerousHtml from "Components/DangerousHtml";
import type { PendingDepositLimitsChangesSelected } from "Models/playOkay/depositLimits";
import { formatCurrency } from "Utils";

type Props = PendingDepositLimitsChangesSelected & {
  currency: string,
  locale: string,
  limitCancel: () => void,
  t: {
    pending_remove_all: string,
    pending_increase: string,
    daily_short: string,
    weekly_short: string,
    monthly_short: string,
    cancel_pending_increases: string,
    cancel_pending_remove_all: string,
  },
};
export function PendingChanges(props: Props) {
  const { t } = props;
  const hasPendingChanges = !R.isEmpty(props.pendingChanges);
  if (!hasPendingChanges) {
    return null;
  }

  return (
    <Flex
      direction="vertical"
      align="stretch"
      justify="space-between"
      spacing="none"
      className="u-padding-x--md u-padding-y--lg t-border-top t-border-grey-5 t-background-white"
    >
      <Flex align="center" justify="space-between" spacing="none">
        <ClockIcon size="sm" className="t-color-yellow-30" />
        <Text
          tag="span"
          size="sm"
          className="u-margin-left--md t-color-grey-50 o-flex--1"
        >
          {props.allRemoved ? (
            <DangerousHtml html={t.pending_remove_all} />
          ) : (
            <>
              <Text
                tag="span"
                size="sm"
                className="t-color-orange-30 u-font-weight-bold"
              >
                {t.pending_increase}{" "}
              </Text>
              {props.pendingChanges
                .map(
                  x =>
                    `${formatCurrency({
                      locale: props.locale,
                      currency: props.currency,
                      value: x.value,
                    })} ${t[`${x.limitKind}_short`]}`
                )
                .join(", ")}
            </>
          )}
        </Text>
      </Flex>
      <ButtonSecondary
        className="o-flex--1 u-margin-top--lg"
        size="md"
        data-test-id="cancel-pending-limit-change"
        onClick={props.limitCancel}
      >
        {props.allRemoved
          ? t.cancel_pending_remove_all
          : t.cancel_pending_increases}
      </ButtonSecondary>
    </Flex>
  );
}
