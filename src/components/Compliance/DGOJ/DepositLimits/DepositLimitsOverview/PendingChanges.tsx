import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonSecondary } from "@casumo/cmp-button";
import { TimeLockedIcon } from "@casumo/cmp-icons";
import * as R from "ramda";
import * as React from "react";
import type { PendingDepositLimitsChangesSelected } from "Models/playOkay/dgojDepositLimits";
import DangerousHtml from "Components/DangerousHtml";
import { formatCurrency } from "Utils";
import { TCurrencyCode } from "Src/constants";

type Props = PendingDepositLimitsChangesSelected & {
  currency: TCurrencyCode;
  locale: string;
  limitCancel: () => void;
  t: {
    pending_remove_all: string;
    pending_increase: string;
    daily_short: string;
    weekly_short: string;
    monthly_short: string;
    cancel_pending_increases: string;
    cancel_pending_remove_all: string;
  };
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
      className="u-padding-x--md u-padding-y--lg t-border-top border-grey-5 bg-white"
    >
      <Flex align="center" justify="space-between" spacing="none">
        <TimeLockedIcon size="sm" className="text-yellow-30" />
        <Text
          tag="span"
          size="sm"
          className="u-margin-left--md text-grey-50 o-flex--1"
        >
          {props.allRemoved ? (
            <DangerousHtml html={t.pending_remove_all} />
          ) : (
            <>
              <Text
                tag="span"
                size="sm"
                className="text-orange-30 u-font-weight-bold"
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
        size="sm"
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
