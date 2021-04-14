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
  canToggleInterval: boolean;
};

type Props = OwnProps & typeof SettingsRealityCheck.defaultProps;

export class SettingsRealityCheck extends PureComponent<Props> {
  static defaultProps = {
    onChange: () => {},
    onSave: () => {},
  };

  render() {
    const {
      onChange,
      onSave,
      isLoading,
      interval,
      labels,
      canToggleInterval,
    } = this.props;

    const OFF = 0;
    const enabled = interval !== OFF;

    const change = value => onChange(value ? options[0].value : OFF);

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
          <Text className="t-color-grey-70">
            {labels.inGameSessionUpdatesFrequencyLabel}
          </Text>
          <PillSelector
            disabled={!enabled}
            className="u-margin-top--xlg"
            options={options}
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
            className="u-margin-top--lg u-text-align-center u-cursor--pointer t-color-blue-60 u-font-weight-bold"
          >
            {labels.cancel}
          </div>
        </div>
      </>
    );
  }
}
