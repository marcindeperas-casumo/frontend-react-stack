// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as R from "ramda";
import { showModal } from "Models/modal";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import {
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  type Period,
  loginTimeLimitsCmsKeyPrefix as cmsKeyPrefix,
} from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import { useTranslationsGql } from "Utils/hooks";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";
import { TimeLimitsCardDesktop } from "./TimeLimitsCardDesktop";

type Props = {
  selectedPeriod?: Period,
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
  });
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);
  const onClick = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM));

  const isNotNil = R.complement(R.isNil);
  const selectedLimit = R.find(R.propEq("period", selectedPeriod))(
    R.filter(isNotNil, [dailyLimit, weeklyLimit, monthlyLimit])
  );

  return (
    <>
      <Mobile>
        <TimeLimitsCardMobile
          t={t}
          dailyLimit={dailyLimit}
          weeklyLimit={weeklyLimit}
          monthlyLimit={monthlyLimit}
          onClick={onClick}
        />
      </Mobile>
      <TabletAndDesktop>
        <TimeLimitsCardDesktop t={t} limit={selectedLimit} onClick={onClick} />
      </TabletAndDesktop>
    </>
  );
}
