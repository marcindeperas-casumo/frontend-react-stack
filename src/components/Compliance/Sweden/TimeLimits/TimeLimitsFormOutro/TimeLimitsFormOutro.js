// @flow
import * as React from "react";
import { DateTime } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { TickIcon } from "@casumo/cmp-icons";
import { type LoginTimeLimit } from "Models/playOkay";
import { interpolate } from "Utils";

type Props = {
  t: {
    time_limits_form_outro_copy_initial: string,
    time_limits_form_outro_copy_decreasing: string,
    time_limits_form_outro_copy_increasing: string,
    time_limits_form_outro_cta: string,
    period_daily: string,
    period_weekly: string,
    period_monthly: string,
  },
  initial?: boolean,
  onClickCta: () => void,
  dailyLimit: LoginTimeLimit,
  weeklyLimit: LoginTimeLimit,
  monthlyLimit: LoginTimeLimit,
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
      className="u-padding-top--md u-padding u-padding--lg@desktop u-padding--lg@tablet"
    >
      <Flex.Item className="u-text-align-center">
        <TickIcon size="lg" className="t-color-green" />
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
        <Button
          onClick={onClickCta}
          variant="primary"
          size="md"
          className="u-width--full u-margin-top--5xlg"
        >
          {t.time_limits_form_outro_cta}
        </Button>
      </Flex.Item>
    </Flex>
  );
}

type CopyProps = {
  initial?: boolean,
  dailyLimit: LoginTimeLimit,
  weeklyLimit: LoginTimeLimit,
  monthlyLimit: LoginTimeLimit,
  t: {
    period_daily: string,
    period_weekly: string,
    period_monthly: string,
    time_limits_form_outro_copy_initial: string,
    time_limits_form_outro_copy_decreasing: string,
    time_limits_form_outro_copy_increasing: string,
  },
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
      <Text className="u-text-align-center">
        {t.time_limits_form_outro_copy_initial}
      </Text>
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
  limit: LoginTimeLimit,
  t: {
    period_daily: string,
    period_weekly: string,
    period_monthly: string,
    time_limits_form_outro_copy_decreasing: string,
    time_limits_form_outro_copy_increasing: string,
  },
};

function LimitCopy({ limit, t }: LimitCopyProps) {
  const replacements = {
    period: t[`period_${limit.period.toLowerCase()}`],
  };

  if (limit.comingLimit) {
    return (
      <Text className="u-text-align-center">
        {interpolate(t.time_limits_form_outro_copy_increasing, {
          ...replacements,
          date: DateTime.fromMillis(limit.comingLimit.activationTime).toFormat(
            "DD"
          ),
        })}
      </Text>
    );
  }

  return (
    <Text className="u-text-align-center">
      {interpolate(t.time_limits_form_outro_copy_decreasing, replacements)}
    </Text>
  );
}
