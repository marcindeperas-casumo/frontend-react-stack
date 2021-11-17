import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { showModal } from "Models/modal";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
  limitsInformationsCmsKeyPrefix,
} from "Models/playOkay";
import type { Period } from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import { useTranslationsGql } from "Utils/hooks";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";
import { TimeLimitsCardDesktop } from "./TimeLimitsCardDesktop";

type Props = {
  selectedPeriod?: Period;
};

export function TimeLimitsCardContainer({ selectedPeriod }: Props) {
  const dispatch = useDispatch();
  const { t } = useTranslationsGql({
    desktop_title: `${cmsKeyPrefix}desktop_title`,
    coming_limit_note: `${cmsKeyPrefix}coming_limit_note`,
    mobile_title: `${cmsKeyPrefix}mobile_title`,
    mobile_subtitle: `${cmsKeyPrefix}mobile_subtitle`,
    period_daily: `${cmsKeyPrefix}period_daily`,
    period_weekly: `${cmsKeyPrefix}period_weekly`,
    period_monthly: `${cmsKeyPrefix}period_monthly`,
    mobile_limit_daily: `${cmsKeyPrefix}mobile_limit_daily`,
    mobile_limit_weekly: `${cmsKeyPrefix}mobile_limit_weekly`,
    mobile_limit_monthly: `${cmsKeyPrefix}mobile_limit_monthly`,
    time_left_daily: `${cmsKeyPrefix}time_left_daily`,
    time_left_weekly: `${cmsKeyPrefix}time_left_weekly`,
    time_left_monthly: `${cmsKeyPrefix}time_left_monthly`,
    edit_limit_button: `${limitsInformationsCmsKeyPrefix}edit_limit_button`,
  });
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);
  const onClick = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM));

  const isNotNil = R.complement(R.isNil);
  const selectedLimit = R.find(R.propEq("period", selectedPeriod))(
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown[]' is not assignable to ... Remove this comment to see the full error message
    R.filter(isNotNil, [dailyLimit, weeklyLimit, monthlyLimit])
  );

  if (selectedLimit) {
    return (
      // @ts-expect-error ts-migrate(2740) FIXME: Type 'Record<"period", any>' is missing the follow... Remove this comment to see the full error message
      <TimeLimitsCardDesktop t={t} limit={selectedLimit} onClick={onClick} />
    );
  }

  return (
    <TimeLimitsCardMobile
      t={t}
      // @ts-expect-error ts-migrate(2740) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
      dailyLimit={dailyLimit}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'LoginTim... Remove this comment to see the full error message
      weeklyLimit={weeklyLimit}
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'LoginTim... Remove this comment to see the full error message
      monthlyLimit={monthlyLimit}
      onClick={onClick}
    />
  );
}
