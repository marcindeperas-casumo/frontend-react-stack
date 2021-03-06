import Text from "@casumo/cmp-text";
import React from "react";
import { DateTime } from "luxon";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

type SettingsSectionsLastLoginType = {
  currentSessionMessageLabel: string | undefined;
  lastSessionMessageLabel: string | undefined;
  accountActivityLabel: string | undefined;
  currentTime: number;
  previousTime: number;
};

const PreviousLoginTime = ({
  time,
  label,
}: {
  time: number;
  label: string | undefined;
}) => {
  const dateObject = DateTime.fromMillis(time);

  return (
    <Text size="sm" className="text-grey-50 u-margin-bottom">
      <ContentReplacer
        value={label || ""}
        replacements={{
          lastLoginDate: `<span class="text-grey-70">${dateObject.toLocaleString(
            DateTime.DATE_FULL
          )}</span>`,
          lastLoginTime: `<span class="text-grey-70">${dateObject.toLocaleString(
            DateTime.TIME_24_SIMPLE
          )}</span>`,
        }}
      />
    </Text>
  );
};

const CurrentLoginTime = ({
  time,
  label = "",
}: {
  time: number;
  label: string | undefined;
}) => (
  <Text size="sm" className="text-grey-50">
    {label}&nbsp;
    <Timer
      startTime={time}
      render={({ hours, minutes, seconds }) => (
        <strong className="text-grey-70">
          {hours}:{minutes}:{seconds}
        </strong>
      )}
    />
  </Text>
);

export const SettingsSectionsLastLogin = ({
  currentSessionMessageLabel,
  lastSessionMessageLabel,
  accountActivityLabel,
  currentTime,
  previousTime,
}: SettingsSectionsLastLoginType) => {
  const openAccountActivity = () =>
    launchModal({
      modal: MODALS.ACCOUNT_SETTINGS.SHOW_ACCOUNT_ACTIVITY,
    });

  return (
    <div className="u-text-align-center u-line-height--15 u-margin-bottom--md">
      {currentTime && (
        <CurrentLoginTime
          time={currentTime}
          label={currentSessionMessageLabel}
        />
      )}
      {previousTime && (
        <PreviousLoginTime
          time={previousTime}
          label={lastSessionMessageLabel}
        />
      )}
      <Text
        tag="div"
        className="u-cursor--pointer u-font-weight-bold text-blue-60"
        onClick={openAccountActivity}
      >
        {accountActivityLabel}
      </Text>
    </div>
  );
};
