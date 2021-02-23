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
      // @ts-expect-error ts-migrate(2740) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      t={t}
      initial={initial}
      onClickCta={onClickCta}
      // @ts-expect-error ts-migrate(2740) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      dailyLimit={dailyLimit}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'LoginTim... Remove this comment to see the full error message
      weeklyLimit={weeklyLimit}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'LoginTim... Remove this comment to see the full error message
      monthlyLimit={monthlyLimit}
    />
  );
}
