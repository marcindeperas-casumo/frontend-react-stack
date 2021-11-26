import * as React from "react";
import { Duration as LuxonDuration } from "luxon";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { interpolateWithJSX } from "Utils";
import type { TLoginTimeLimit } from "Models/playOkay";
import { useBreakpointsWatch } from "Utils/hooks/useBreakpointsWatch";
import { TimeLimitsCardDuration } from "./TimeLimitsCardDuration";
import { ComingLimitNote } from "./ComingLimitNote";
import { ComingRevocationNote } from "./ComingRevocationNote";

type Props = {
  t: {
    mobile_title: string | undefined;
    mobile_subtitle: string | undefined;
    mobile_limit_daily: string | undefined;
    mobile_limit_weekly: string | undefined;
    mobile_limit_monthly: string | undefined;
    time_left_daily: string | undefined;
    coming_limit_note: string | undefined;
    coming_revocation_note: string | undefined;
    edit_limit_button: string | undefined;
  };
  dailyLimit?: TLoginTimeLimit;
  weeklyLimit?: TLoginTimeLimit;
  monthlyLimit?: TLoginTimeLimit;
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

  return (
    <div
      className={cx(
        "flex flex-col justify-between gap",
        "m-lg p-lg",
        "border-2 rounded border-grey-5",
        {
          "tablet:flex-row tablet:items-end": gtPhablet,
        }
      )}
    >
      <div className="flex flex-col items-start gap">
        <Text className="font-bold text-purple-60">{t?.mobile_title}</Text>
        <Text size="sm" className="text-grey-50">
          {t?.mobile_subtitle}
        </Text>
        <LimitRow
          limit={dailyLimit}
          t={{ ...t, label: t?.mobile_limit_daily }}
        />
        <LimitRow
          limit={weeklyLimit}
          t={{ ...t, label: t?.mobile_limit_weekly }}
        />
        <LimitRow
          limit={monthlyLimit}
          t={{ ...t, label: t?.mobile_limit_monthly }}
        />
        <HoursLeftToday t={t} dailyLimit={dailyLimit} />
      </div>
      <ButtonPrimary size="sm" onClick={onClick} className="self-end">
        {t?.edit_limit_button}
      </ButtonPrimary>
    </div>
  );
}

type LimitRowProps = {
  t: {
    label: string | undefined;
    coming_limit_note: string | undefined;
    coming_revocation_note: string | undefined;
  };
  limit: TLoginTimeLimit | undefined;
};

function LimitRow({ t, limit }: LimitRowProps) {
  if (!limit) {
    return null;
  }

  const limitDuration = LuxonDuration.fromISO(limit.limit);

  return (
    <div>
      <Text tag="span" size="sm" className="text-grey-50">
        {interpolateWithJSX(
          { time: <TimeLimitsCardDuration duration={limitDuration} /> },
          t.label
        )}
      </Text>
      <ComingLimitNote t={t} limit={limit} />
      <ComingRevocationNote t={t} limit={limit} />
    </div>
  );
}

function HoursLeftToday({ t, dailyLimit }: Pick<Props, "t" | "dailyLimit">) {
  if (!dailyLimit) {
    return null;
  }

  const dailyLimitDuration = LuxonDuration.fromISO(dailyLimit.limit);
  const hrsLeftToday = dailyLimitDuration.minus(
    LuxonDuration.fromISO(dailyLimit.consumedTime)
  );

  return (
    <Text tag="em" size="sm" className="text-grey-50">
      {interpolateWithJSX(
        { time: <TimeLimitsCardDuration duration={hrsLeftToday} /> },
        t?.time_left_daily
      )}
    </Text>
  );
}
