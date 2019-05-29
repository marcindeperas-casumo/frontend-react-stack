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
  onChange: (active: boolean) => void,
  className?: string,
}) => (
  <SettingsRow
    className={className}
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
    <Toggle checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
