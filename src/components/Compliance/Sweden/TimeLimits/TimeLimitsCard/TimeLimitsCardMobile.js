// @flow
import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { interpolateWithJSX } from "Utils";
import { type LoginTimeLimit } from "Models/playOkay";
import { prepareDuration } from "./TimeLimitsCard.utils";
import { ComingLimitNote } from "./ComingLimitNote";

type Props = {
  t: {
    mobile_title: string,
    mobile_subtitle: string,
    time_per_day: string,
    time_per_week: string,
    time_per_month: string,
    time_left_daily: string,
    coming_limit_note: string,
  },
  dailyLimit: LoginTimeLimit,
  weeklyLimit: LoginTimeLimit,
  monthlyLimit: LoginTimeLimit,
  onClick: () => void,
};

export function TimeLimitsCardMobile({
  t,
  dailyLimit,
  weeklyLimit,
  monthlyLimit,
  onClick,
}: Props) {
  const dailyLimitDuration = LuxonDuration.fromISO(dailyLimit.limit);
  const hrsLeftToday = dailyLimitDuration.minus(
    LuxonDuration.fromISO(dailyLimit.consumedTime)
  );

  return (
    <Flex direction="vertical" align="center" onClick={onClick}>
      <Flex.Item>
        <Text
          size="md"
          className="u-font-weight-bold t-color-grey-dark-1 u-margin-bottom--none"
        >
          {t.mobile_title}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text size="sm" className="t-color-grey-dark-1 u-text-align-center">
          {t.mobile_subtitle}
        </Text>
      </Flex.Item>
      <LimitRow limit={dailyLimit} t={{ ...t, label: t.time_per_day }} />
      <LimitRow limit={weeklyLimit} t={{ ...t, label: t.time_per_week }} />
      <LimitRow limit={monthlyLimit} t={{ ...t, label: t.time_per_month }} />
      <Flex.Item className="u-margin-top--lg">
        <Text tag="em" className="t-color-grey-dark-1">
          {interpolateWithJSX(
            { time: prepareDuration(hrsLeftToday) },
            t.time_left_daily
          )}
        </Text>
      </Flex.Item>
    </Flex>
  );
}

type LimitRowProps = {
  t: {
    label: string,
    coming_limit_note: string,
  },
  limit: LoginTimeLimit,
};

function LimitRow({ t, limit }: LimitRowProps) {
  const limitDuration = LuxonDuration.fromISO(limit.limit);

  return (
    <>
      <Flex.Item>
        <Text tag="span" size="md" className="t-color-grey-dark-1">
          {interpolateWithJSX(
            { time: prepareDuration(limitDuration) },
            t.label
          )}
        </Text>
      </Flex.Item>
      <ComingLimitNote t={t} limit={limit} />
    </>
  );
}
