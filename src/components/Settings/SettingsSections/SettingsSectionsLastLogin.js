// @flow
import React from "react";
import { DateTime } from "luxon";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";

type SettingsSectionsLastLoginType = {
  currentSessionMessage: string,
  lastSessionMessage: string,
  time: number,
};

export const SettingsSectionsLastLogin = ({
  currentSessionMessage,
  lastSessionMessage,
  time,
}: SettingsSectionsLastLoginType) => {
  const dateObject = DateTime.fromMillis(time);
  return (
    <div className="c-bottom-bar u-text-align-center u-padding--lg">
      <div>
        {currentSessionMessage}&nbsp;
        <Timer
          startTime={time}
          render={({ hours, minutes, seconds }) => (
            <strong>
              {hours}:{minutes}:{seconds}
            </strong>
          )}
        />
      </div>
      <ContentReplacer
        value={lastSessionMessage}
        replacements={{
          lastLoginDate: dateObject.toLocaleString(DateTime.DATE_FULL),
          lastLoginTime: dateObject.toLocaleString(DateTime.TIME_24_SIMPLE),
        }}
      />
    </div>
  );
};
