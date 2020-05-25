//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";

export const SettingsNotificationsSubscriptionRow = ({
  label,
  isEnabled,
  onChange,
}: {
  label: ?string,
  isEnabled: boolean,
  onChange: (active: boolean) => any,
}) => (
  <SettingsRow
    padding="md"
    text={<Text className="t-color-chrome-dark-2">{label}</Text>}
  >
    <Checkbox checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
