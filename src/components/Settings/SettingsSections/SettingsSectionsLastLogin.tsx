// @flow
import React from "react";
import { DateTime } from "luxon";
import Text from "@casumo/cmp-text";
import Timer from "Components/Timer";
import { ContentReplacer } from "Components/ContentReplacer";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";

type SettingsSectionsLastLoginType = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  currentSessionMessageLabel: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  lastSessionMessageLabel: ?string,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  accountActivityLabel: ?string,
  currentTime: number,
  previousTime: number,
};

const PreviousLoginTime = ({
  time,
  label,
}: {
  time: number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string,
}) => {
  const dateObject = DateTime.fromMillis(time);

  return (
    <Text size="sm" className="t-color-grey-50 u-margin-bottom">
      <ContentReplacer
        value={label || ""}
        replacements={{
          lastLoginDate: `<span class="t-color-grey-70">${dateObject.toLocaleString(
            DateTime.DATE_FULL
          )}</span>`,
          lastLoginTime: `<span class="t-color-grey-70">${dateObject.toLocaleString(
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
  time: number,
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string,
}) => (
  <Text size="sm" className="t-color-grey-50">
    {label}&nbsp;
    <Timer
      startTime={time}
      render={({ hours, minutes, seconds }) => (
        <strong className="t-color-grey-70">
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
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
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
        className="u-cursor-pointer u-font-weight-bold t-color-blue-60"
        onClick={openAccountActivity}
      >
        {accountActivityLabel}
      </Text>
    </div>
  );
};
