// @flow
import React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

type SettingsSectionsLastLoginType = {
  currentSessionMessageLabel: string,
  lastSessionMessageLabel: string,
  accountActivityLabel: string,
  time: number,
};

export const SettingsSectionsLastLogin = ({
  currentSessionMessageLabel,
  lastSessionMessageLabel,
  accountActivityLabel,
  time,
}: SettingsSectionsLastLoginType) => {
  const dateObject = DateTime.fromMillis(time);

  const openAccountActivity = () =>
    launchModal({
      modal: MODALS.ACCOUNT_SETTINGS.SHOW_ACCOUNT_ACTIVITY,
    });

  return (
    <div className="u-text-align-center u-line-height--15">
      <div>
        {currentSessionMessageLabel}&nbsp;
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
        value={lastSessionMessageLabel}
        replacements={{
          lastLoginDate: dateObject.toLocaleString(DateTime.DATE_FULL),
          lastLoginTime: dateObject.toLocaleString(DateTime.TIME_24_SIMPLE),
        }}
      />
      <Text tag="p">
        <a
          className="u-cursor-pointer u-font-weight-bold"
          onClick={openAccountActivity}
        >
          {accountActivityLabel}
        </a>
      </Text>
    </div>
  );
};
