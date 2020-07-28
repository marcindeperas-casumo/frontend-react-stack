// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
} from "Models/playOkay";
import { useTranslationsGql } from "Utils/hooks";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";

type Props = {
  initial: boolean,
  onClickCta: () => void,
};

export function TimeLimitsFormOutroContainer({ initial, onClickCta }: Props) {
  const { t } = useTranslationsGql({
    form_outro_copy_initial: `${cmsKeyPrefix}form_outro_copy_initial`,
    form_outro_copy_decreasing: `${cmsKeyPrefix}form_outro_copy_decreasing`,
    form_outro_copy_increasing: `${cmsKeyPrefix}form_outro_copy_increasing`,
    form_outro_cta: `${cmsKeyPrefix}form_outro_cta`,
    period_daily: `${cmsKeyPrefix}period_daily`,
    period_weekly: `${cmsKeyPrefix}period_weekly`,
    period_monthly: `${cmsKeyPrefix}period_monthly`,
  });
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);

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
