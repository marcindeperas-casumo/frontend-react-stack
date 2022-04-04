import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "Models/modal";
import {
  loginTimeLimitsCmsSlug,
  useGetPlayerStateByIdQuery,
  selectLoginTimeLimitFromResult,
} from "Models/playOkay";
import { REACT_APP_MODAL } from "Src/constants";
import { useTranslations } from "Utils/hooks";
import { playerIdSelector } from "Models/handshake";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";

export function TimeLimitsCardContainer() {
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector);
  const {
    isLoading,
    dailyLimit,
    weeklyLimit,
    monthlyLimit,
  } = useGetPlayerStateByIdQuery(playerId, {
    selectFromResult: ({ data, ...rest }) => ({
      isLoading: rest.isLoading,
      dailyLimit: selectLoginTimeLimitFromResult("Daily", data),
      weeklyLimit: selectLoginTimeLimitFromResult("Weekly", data),
      monthlyLimit: selectLoginTimeLimitFromResult("Monthly", data),
    }),
  });
  const t = useTranslations<{
    desktop_title: string;
    coming_limit_note: string;
    coming_revocation_note: string;
    mobile_title: string;
    mobile_subtitle: string;
    period_daily: string;
    period_weekly: string;
    period_monthly: string;
    mobile_limit_daily: string;
    mobile_limit_weekly: string;
    mobile_limit_monthly: string;
    time_left_daily: string;
    time_left_weekly: string;
    time_left_monthly: string;
    edit_limit_button: string;
  }>(loginTimeLimitsCmsSlug);
  const onClick = () =>
    dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM));

  if (isLoading) {
    return null;
  }

  return (
    <TimeLimitsCardMobile
      t={t}
      dailyLimit={dailyLimit}
      weeklyLimit={weeklyLimit}
      monthlyLimit={monthlyLimit}
      onClick={onClick}
    />
  );
}
