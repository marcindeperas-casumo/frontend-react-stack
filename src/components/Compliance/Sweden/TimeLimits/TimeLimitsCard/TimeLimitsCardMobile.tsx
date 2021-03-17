import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import { interpolateWithJSX } from "Utils";
import type { LoginTimeLimit } from "Models/playOkay";
import { TimeLimitsCardDuration } from "./TimeLimitsCardDuration";
import { ComingLimitNote } from "./ComingLimitNote";

type Props = {
  t: {
    mobile_title: string | undefined;
    mobile_subtitle: string | undefined;
    mobile_limit_daily: string | undefined;
    mobile_limit_weekly: string | undefined;
    mobile_limit_monthly: string | undefined;
    time_left_daily: string | undefined;
    coming_limit_note: string | undefined;
  };
  dailyLimit: LoginTimeLimit | undefined;
  weeklyLimit: LoginTimeLimit | undefined;
  monthlyLimit: LoginTimeLimit | undefined;
  onClick: () => void;
};

export function TimeLimitsCardMobile({
  t,
  dailyLimit,
  weeklyLimit,
  monthlyLimit,
  onClick,
}: Props) {
  if (!dailyLimit) {
    return null;
  }

  const dailyLimitDuration = LuxonDuration.fromISO(dailyLimit.limit);
  const hrsLeftToday = dailyLimitDuration.minus(
    LuxonDuration.fromISO(dailyLimit.consumedTime)
  );

  return (
    <Flex
      direction="vertical"
      align="center"
      onClick={onClick}
      className="u-padding--md"
    >
      <Flex.Item>
        <Text
          size="md"
          className="u-font-weight-bold t-color-grey-50 u-margin-bottom--none"
        >
          {t.mobile_title}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text size="sm" className="t-color-grey-50 u-text-align-center">
          {t.mobile_subtitle}
        </Text>
      </Flex.Item>
      <LimitRow limit={dailyLimit} t={{ ...t, label: t.mobile_limit_daily }} />
      <LimitRow
        limit={weeklyLimit}
        t={{ ...t, label: t.mobile_limit_weekly }}
      />
      <LimitRow
        limit={monthlyLimit}
        t={{ ...t, label: t.mobile_limit_monthly }}
      />
      <Flex.Item className="u-margin-top--lg">
        <Text tag="em" className="t-color-grey-50">
          {interpolateWithJSX(
            { time: <TimeLimitsCardDuration duration={hrsLeftToday} /> },
            t.time_left_daily
          )}
        </Text>
      </Flex.Item>
    </Flex>
  );
}

type LimitRowProps = {
  t: {
    label: string | undefined;
    coming_limit_note: string | undefined;
  };
  limit: LoginTimeLimit | undefined;
};

function LimitRow({ t, limit }: LimitRowProps) {
  if (!limit) {
    return null;
  }

  const limitDuration = LuxonDuration.fromISO(limit.limit);

  return (
    <>
      <Flex.Item>
        <Text tag="span" size="md" className="t-color-grey-50">
          {interpolateWithJSX(
            { time: <TimeLimitsCardDuration duration={limitDuration} /> },
            t.label
          )}
        </Text>
      </Flex.Item>
      <ComingLimitNote t={t} limit={limit} />
    </>
  );
}
