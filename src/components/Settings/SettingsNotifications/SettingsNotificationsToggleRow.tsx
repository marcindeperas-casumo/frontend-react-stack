import Text from "@casumo/cmp-text";
import React from "react";
import { Toggle } from "Components/Toggle/Toggle";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";

export const SettingsNotificationsToggleRow = ({
  label,
  isEnabled,
  onChange,
  className = "",
}: {
  label: string | undefined;
  isEnabled: boolean;
  onChange: (active: boolean) => any;
  className?: string;
}) => (
  <SettingsRow
    className={className}
    text={<Text className="text-grey-70">{label}</Text>}
  >
    <Toggle checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
