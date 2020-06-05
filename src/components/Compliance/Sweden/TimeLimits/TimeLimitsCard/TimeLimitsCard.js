// @flow
import * as React from "react";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import { type LoginTimeLimit } from "Models/playOkay";
import { TimeLimitsCardMobile } from "./TimeLimitsCardMobile";

type Props = {
  t: {
    mobile_title: string,
    mobile_subtitle: string,
    time_per_day: string,
    time_per_week: string,
    time_per_month: string,
    time_left_today: string,
    coming_limit_note: string,
  },
  onClick: () => void,
  dailyLimit: LoginTimeLimit,
  weeklyLimit: LoginTimeLimit,
  monthlyLimit: LoginTimeLimit,
};

export function TimeLimitsCard({ onClick, ...otherProps }: Props) {
  return (
    <div onClick={onClick} className="u-padding--lg u-cursor-pointer">
      <Mobile>
        <TimeLimitsCardMobile {...otherProps} />
      </Mobile>
      <TabletAndDesktop>Desktop not yet implemented</TabletAndDesktop>
    </div>
  );
}
