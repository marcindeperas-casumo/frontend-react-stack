import Text from "@casumo/cmp-text";
import React from "react";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";

export const SettingsNotificationsSubscriptionRow = ({
  label,
  isEnabled,
  onChange,
}: {
  label: string | undefined;
  isEnabled: boolean;
  onChange: (active: boolean) => any;
}) => (
  <SettingsRow
    padding="md"
    text={<Text className="text-grey-70">{label}</Text>}
  >
    <Checkbox checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
