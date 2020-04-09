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
  label: string,
  isEnabled: boolean,
  onChange: (active: boolean) => any,
  className?: string,
}) => (
  <SettingsRow
    className={className}
    text={<Text className="t-color-chrome-dark-2">{label}</Text>}
  >
    <Toggle checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
