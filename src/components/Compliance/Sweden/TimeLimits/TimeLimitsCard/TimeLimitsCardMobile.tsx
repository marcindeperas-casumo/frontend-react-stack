import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { interpolateWithJSX } from "Utils";
import type { LoginTimeLimit } from "Models/playOkay";
import { useBreakpointsWatch } from "Utils/hooks/useBreakpointsWatch";
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
  const { gtPhablet } = useBreakpointsWatch();
console.log('gtPhablet', gtPhablet);
  if (!dailyLimit) {
    return null;
  }

  const dailyLimitDuration = LuxonDuration.fromISO(dailyLimit.limit);
  const hrsLeftToday = dailyLimitDuration.minus(
    LuxonDuration.fromISO(dailyLimit.consumedTime)
  );

  return (
    <div className={cx(
      "flex flex-col justify-between gap",
      "m-lg p-lg",
      "border-2 rounded border-grey-5",
      {
        "tablet:flex-row tablet:items-end": gtPhablet
      }
    )}>
      <div className={cx(
        "flex flex-col items-center gap"
      )}>
        <Text
          className="font-bold text-purple-60"
        >
          {t.mobile_title}
        </Text>
        <Text size="sm" className="text-grey-50">
          {t.mobile_subtitle}
        </Text>
        <LimitRow limit={dailyLimit} t={{ ...t, label: t.mobile_limit_daily }} />
        <LimitRow
          limit={weeklyLimit}
          t={{ ...t, label: t.mobile_limit_weekly }}
        />
        <LimitRow
          limit={monthlyLimit}
          t={{ ...t, label: t.mobile_limit_monthly }}
        />
        <Text tag="em" className="text-grey-50">
          {interpolateWithJSX(
            { time: <TimeLimitsCardDuration duration={hrsLeftToday} /> },
            t.time_left_daily
          )}
        </Text>
      </div>
      <ButtonPrimary
        size="sm"
        onClick={onClick}
        className="self-end"
      >
        Change
      </ButtonPrimary>
    </div>
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
    <div>
      <Text tag="span" className="text-grey-50">
        {interpolateWithJSX(
          { time: <TimeLimitsCardDuration duration={limitDuration} /> },
          t.label
        )}
      </Text>
      <ComingLimitNote t={t} limit={limit} />
    </div>
  );
}
