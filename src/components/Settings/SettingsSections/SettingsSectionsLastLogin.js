// @flow
import React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

type SettingsSectionsLastLoginType = {
  currentSessionMessageLabel: ?string,
  lastSessionMessageLabel: ?string,
  accountActivityLabel: ?string,
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
    <div className="u-text-align-center u-line-height--15 u-margin-bottom--md">
      <Text size="sm" className="t-color-chrome-dark-1">
        {currentSessionMessageLabel}&nbsp;
        <Timer
          startTime={time}
          render={({ hours, minutes, seconds }) => (
            <strong className="t-color-chrome-dark-2">
              {hours}:{minutes}:{seconds}
            </strong>
          )}
        />
      </Text>
      <Text size="sm" className="t-color-chrome-dark-1 u-margin-bottom">
        <ContentReplacer
          value={lastSessionMessageLabel || ""}
          replacements={{
            lastLoginDate: `<span class="t-color-chrome-dark-2">${dateObject.toLocaleString(
              DateTime.DATE_FULL
            )}</span>`,
            lastLoginTime: `<span class="t-color-chrome-dark-2">${dateObject.toLocaleString(
              DateTime.TIME_24_SIMPLE
            )}</span>`,
          }}
        />
      </Text>
      <Text
        tag="div"
        className="u-cursor-pointer u-font-weight-bold t-color-text-link"
        onClick={openAccountActivity}
      >
        {accountActivityLabel}
      </Text>
    </div>
  );
};
