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
    desktop_title:
      "root:shared.playokay.login-time-limits-v2:fields.desktop_title",
    coming_limit_note:
      "root:shared.playokay.login-time-limits-v2:fields.coming_limit_note",
    mobile_title:
      "root:shared.playokay.login-time-limits-v2:fields.mobile_title",
    mobile_subtitle:
      "root:shared.playokay.login-time-limits-v2:fields.mobile_subtitle",
    period_daily:
      "root:shared.playokay.login-time-limits-v2:fields.period_daily",
    period_weekly:
      "root:shared.playokay.login-time-limits-v2:fields.period_weekly",
    period_monthly:
      "root:shared.playokay.login-time-limits-v2:fields.period_monthly",
    mobile_limit_daily:
      "root:shared.playokay.login-time-limits-v2:fields.mobile_limit_daily",
    mobile_limit_weekly:
      "root:shared.playokay.login-time-limits-v2:fields.mobile_limit_weekly",
    mobile_limit_monthly:
      "root:shared.playokay.login-time-limits-v2:fields.mobile_limit_monthly",
    time_left_daily:
      "root:shared.playokay.login-time-limits-v2:fields.time_left_daily",
    time_left_weekly:
      "root:shared.playokay.login-time-limits-v2:fields.time_left_weekly",
    time_left_monthly:
      "root:shared.playokay.login-time-limits-v2:fields.time_left_monthly",
  });
  const dailyLimit = useSelector(dailyLoginTimeLimitSelector);
  const weeklyLimit = useSelector(weeklyLoginTimeLimitSelector);
  const monthlyLimit = useSelector(monthlyLoginTimeLimitSelector);
  const onClick = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM));

  if (!dailyLimit || !weeklyLimit || !monthlyLimit) {
    return null;
  }

  const selectedLimit = R.find(R.propEq("period", selectedPeriod))([
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
  ]);

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
