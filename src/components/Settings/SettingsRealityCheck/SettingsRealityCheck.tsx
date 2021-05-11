import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import React, { PureComponent } from "react";
import * as A from "Types/apollo";
import { SettingsNotificationsToggleRow as ToggleRow } from "Components/Settings/SettingsNotifications/SettingsNotificationsToggleRow";
import { PillSelector } from "Components/PillSelector";
import { options } from "./constants";

type OwnProps = {
  labels: A.Reality_Check_Labels_Query;
  onChange: (interval: number) => void;
  isLoading: boolean;
  onSave: () => void;
  interval: number;
  canToggleInterval?: boolean;
  jurisdiction: string;
};

export class SettingsRealityCheck extends PureComponent<OwnProps> {
  render() {
    const {
      onChange,
      onSave,
      isLoading,
      interval,
      labels,
      canToggleInterval,
      jurisdiction,
    } = this.props;

    const OFF = 0;
    const enabled = interval !== OFF;
    const optionsByJurisdiction = options[jurisdiction] ?? options.default;

    const change = value =>
      onChange(value ? optionsByJurisdiction[0].value : OFF);

    return (
      <>
        {canToggleInterval && (
          <ToggleRow
            label={labels.inGameSessionUpdatesLabel}
            isEnabled={enabled}
            onChange={change}
          />
        )}
        <div className="u-padding--md">
          <Text className="text-grey-70">
            {labels.inGameSessionUpdatesFrequencyLabel}
          </Text>
          <PillSelector
            disabled={!enabled}
            className="u-margin-top--xlg"
            options={optionsByJurisdiction}
            value={interval}
            onChange={onChange}
          />
          <ButtonPrimary
            size="md"
            isLoading={isLoading}
            className="u-width--full u-margin-top--xlg"
            onClick={onSave}
          >
            {labels.save}
          </ButtonPrimary>
          <div
            onClick={() => window.history.back()}
            className="u-margin-top--lg u-text-align-center u-cursor--pointer text-blue-60 u-font-weight-bold"
          >
            {labels.cancel}
          </div>
        </div>
      </>
    );
  }
}
