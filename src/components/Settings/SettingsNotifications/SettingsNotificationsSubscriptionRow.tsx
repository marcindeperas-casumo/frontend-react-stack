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
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  label: ?string,
  isEnabled: boolean,
  onChange: (active: boolean) => any,
}) => (
  <SettingsRow
    padding="md"
    text={<Text className="t-color-grey-70">{label}</Text>}
  >
    <Checkbox checked={isEnabled} onChange={onChange} />
  </SettingsRow>
);
