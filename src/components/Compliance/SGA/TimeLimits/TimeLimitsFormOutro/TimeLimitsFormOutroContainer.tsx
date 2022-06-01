import * as React from "react";
import { useSelector } from "react-redux";
import { playerIdSelector } from "Models/handshake";
import {
  loginTimeLimitsCmsSlug,
  useGetPlayerStateByIdQuery,
  selectLoginTimeLimitFromResult,
} from "Models/playOkay";
import { useTranslations } from "Utils/hooks";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";

type Props = {
  initial: boolean;
  onClickCta: () => void;
};

export function TimeLimitsFormOutroContainer({ initial, onClickCta }: Props) {
  const playerId = useSelector(playerIdSelector);
  const t = useTranslations<{
    form_outro_copy_initial: string;
    form_outro_copy_decreasing: string;
    form_outro_copy_increasing: string;
    form_outro_copy_revoking: string;
    form_outro_cta: string;
    period_daily: string;
    period_weekly: string;
    period_monthly: string;
  }>(loginTimeLimitsCmsSlug);
  // @ts-ignore
  const { dailyLimit, weeklyLimit, monthlyLimit } = useGetPlayerStateByIdQuery(
    playerId as string,
    {
      selectFromResult: ({ data }) => ({
        dailyLimit: selectLoginTimeLimitFromResult("Daily", data),
        weeklyLimit: selectLoginTimeLimitFromResult("Weekly", data),
        monthlyLimit: selectLoginTimeLimitFromResult("Monthly", data),
      }),
    }
  );

  return (
    <TimeLimitsFormOutro
      t={t}
      initial={initial}
      onClickCta={onClickCta}
      dailyLimit={dailyLimit}
      weeklyLimit={weeklyLimit}
      monthlyLimit={monthlyLimit}
    />
  );
}
