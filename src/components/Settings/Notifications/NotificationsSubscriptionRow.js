//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import { Checkbox } from "Components/Checkbox/Checkbox";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";

export const NotificationsSubscriptionRow = ({
  label,
  isEnabled,
  onChange,
}: {
  label: string,
  isEnabled: boolean,
  onChange: (active: boolean) => void,
}) => (
  <SettingsRow
    padding="md"
    text={
      <Text
        tag="p"
        size="sm"
        className="t-color-grey-dark-3 u-font-weight-light"
      >
        {label}
      </Text>
    }
  >
    <Checkbox checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
