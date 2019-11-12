// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import * as A from "Types/apollo";
import { SettingsNotificationsToggleRow as ToggleRow } from "Components/Settings/SettingsNotifications/SettingsNotificationsToggleRow";
import { PillSelector } from "Components/PillSelector";
import { options } from "./constants";

type Props = {
  labels: A.REALITY_CHECK_LABELS_QUERY,
  onChange: (interval: number) => void,
  isLoading: boolean,
  onSave: () => void,
  interval: number,
  canToggleInterval: boolean,
};

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
          <Text className="t-color-chrome-dark-2">
            {labels.inGameSessionUpdatesFrequencyLabel}
          </Text>
          <PillSelector
            disabled={!enabled}
            className="u-margin-top--xlg"
            options={options}
            value={interval}
            onChange={onChange}
          />
          <Button
            variant="primary"
            size="md"
            loading={isLoading}
            className="u-width--full u-margin-top--xlg"
            onClick={onSave}
          >
            {labels.save}
          </Button>
          <div
            onClick={() => window.history.back()}
            className="u-margin-top--lg u-text-align-center u-cursor-pointer t-color-text-link u-font-weight-bold"
          >
            {labels.cancel}
          </div>
        </div>
      </>
    );
  }
}
