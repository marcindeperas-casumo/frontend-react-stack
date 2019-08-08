// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { SettingsNotificationsToggleRow as ToggleRow } from "Components/Settings/SettingsNotifications/SettingsNotificationsToggleRow";
import { PillSelector } from "Components/PillSelector";
import { options } from "./constants";

type Props = {
  labels: REALITY_CHECK_LABELS_QUERY,
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
            className="t-border-bottom--none"
            label={labels.inGameSessionUpdatesLabel}
            isEnabled={enabled}
            onChange={change}
          />
        )}
        <div className="u-padding--md">
          <Text
            tag="p"
            size="sm"
            className="t-color-grey-dark-3 u-font-weight-light"
          >
            {labels.inGameSessionUpdatesFrequencyLabel}
          </Text>
          <div className="u-margin-top--md">
            <PillSelector
              disabled={!enabled}
              className="u-margin-top--md"
              options={options}
              value={interval}
              onChange={onChange}
            />
          </div>
          <Button
            variant="primary"
            loading={isLoading}
            className="u-width--1/1 u-margin-top--xlg"
            onClick={onSave}
          >
            {labels.save}
          </Button>
          <a className="u-cursor-pointer" onClick={() => window.history.back()}>
            <div className="u-width--1/1 u-margin-top--lg center">
              {labels.cancel}
            </div>
          </a>
        </div>
      </>
    );
  }
}
