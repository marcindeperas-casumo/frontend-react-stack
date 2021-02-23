// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { Toggle } from "Components/Toggle/Toggle";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";

export const SettingsNotificationsToggleRow = ({
  label,
  isEnabled,
  onChange,
  className = "",
}: {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string,
  isEnabled: boolean,
  onChange: (active: boolean) => any,
  className?: string,
}) => (
  <SettingsRow
    className={className}
    text={<Text className="t-color-grey-70">{label}</Text>}
  >
    <Toggle checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
