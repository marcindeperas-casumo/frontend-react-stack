import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { CheckIcon } from "@casumo/cmp-icons";
import { DateTime } from "luxon";
import * as React from "react";
import type { TLoginTimeLimit } from "Models/playOkay";
import { interpolate } from "Utils";

type Props = {
  t: {
    form_outro_copy_initial: string | undefined;
    form_outro_copy_decreasing: string | undefined;
    form_outro_copy_increasing: string | undefined;
    form_outro_copy_revoking: string | undefined;
    form_outro_cta: string | undefined;
    period_daily: string | undefined;
    period_weekly: string | undefined;
    period_monthly: string | undefined;
  };
  initial?: boolean;
  onClickCta: () => void;
  dailyLimit?: TLoginTimeLimit;
  weeklyLimit?: TLoginTimeLimit;
  monthlyLimit?: TLoginTimeLimit;
};

export function TimeLimitsFormOutro({
  t,
  initial,
  onClickCta,
  dailyLimit,
  weeklyLimit,
  monthlyLimit,
}: Props) {
  return (
    <Flex
      direction="vertical"
      spacing="md"
      align="stretch"
      className="u-padding--md u-padding--lg@desktop u-padding--lg@tablet"
    >
      <Flex.Item className="u-text-align-center">
        <CheckIcon size="lg" className="text-green-30" />
      </Flex.Item>
      <Flex.Item className="u-margin-bottom--5xlg">
        <Copy
          t={t}
          initial={initial}
          dailyLimit={dailyLimit}
          weeklyLimit={weeklyLimit}
          monthlyLimit={monthlyLimit}
        />
      </Flex.Item>
      <Flex.Item>
        <ButtonPrimary
          onClick={onClickCta}
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          {t.form_outro_cta || ""}
        </ButtonPrimary>
      </Flex.Item>
    </Flex>
  );
}

type CopyProps = {
  initial?: boolean;
  dailyLimit: TLoginTimeLimit | null;
  weeklyLimit: TLoginTimeLimit | null;
  monthlyLimit: TLoginTimeLimit | null;
  t: {
    period_daily: string | undefined;
    period_weekly: string | undefined;
    period_monthly: string | undefined;
    form_outro_copy_initial: string | undefined;
    form_outro_copy_decreasing: string | undefined;
    form_outro_copy_increasing: string | undefined;
    form_outro_copy_revoking: string | undefined;
  };
};

function Copy({
  t,
  initial,
  dailyLimit,
  weeklyLimit,
  monthlyLimit,
}: CopyProps) {
  if (initial) {
    return (
      <Text className="u-text-align-center">{t.form_outro_copy_initial}</Text>
    );
  }

  return (
    <>
      <LimitCopy t={t} limit={dailyLimit} />
      <LimitCopy t={t} limit={weeklyLimit} />
      <LimitCopy t={t} limit={monthlyLimit} />
    </>
  );
}

type LimitCopyProps = {
  limit: TLoginTimeLimit | null;
  t: {
    period_daily: string | undefined;
    period_weekly: string | undefined;
    period_monthly: string | undefined;
    form_outro_copy_decreasing: string | undefined;
    form_outro_copy_increasing: string | undefined;
    form_outro_copy_revoking: string | undefined;
  };
};

function LimitCopy({ limit, t }: LimitCopyProps) {
  if (!limit) {
    return null;
  }

  const replacements = {
    period: t[`period_${limit.period.toLowerCase()}`],
  };

  if (limit.comingLimit) {
    return (
      <Text className="u-text-align-center">
        {interpolate(t.form_outro_copy_increasing || "", {
          ...replacements,
          date: DateTime.fromMillis(limit.comingLimit.activationTime).toFormat(
            "DD"
          ),
        })}
      </Text>
    );
  }

  if (limit.comingRevocation) {
    return (
      <Text className="u-text-align-center">
        {interpolate(t?.form_outro_copy_revoking, {
          ...replacements,
          date: DateTime.fromMillis(
            limit.comingRevocation.revocationTime
          ).toFormat("DD"),
        })}
      </Text>
    );
  }

  return (
    <Text className="u-text-align-center">
      {interpolate(t.form_outro_copy_decreasing || "", replacements)}
    </Text>
  );
}
