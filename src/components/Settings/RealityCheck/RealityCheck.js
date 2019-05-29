// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { NotificationsToggleRow as ToggleRow } from "Components/Settings/Notifications/NotificationsToggleRow";
import { PillSelector } from "Components/PillSelector";
import { options } from "./constants";

type Props = {
  query: PLAYER_REALITY_CHECK_QUERY,
  labels: REALITY_CHECK_LABELS_QUERY,
  onChange: (interval: number) => void,
  isLoading: boolean,
  onSave: () => void,
  updateError: ?string,
  interval: number,
};

export class RealityCheck extends PureComponent<Props> {
  render() {
    const { onChange, onSave, isLoading, interval, labels } = this.props;

    const OFF = 0;
    const enabled = interval !== OFF;

    const change = value => onChange(value ? options[0].value : OFF);

    return (
      <>
        <ToggleRow
          className="t-border-bottom--none"
          label={labels.inGameSessionUpdatesLabel}
          isEnabled={enabled}
          onChange={change}
        />
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
            loading={isLoading}
            className="u-width--1/1 u-margin-top--xlg"
            onClick={onSave}
          >
            {labels.save}
          </Button>
          <a onClick={window.history.back}>
            <div className="u-width--1/1 u-margin-top--lg center">
              {labels.cancel}
            </div>
          </a>
        </div>
      </>
    );
  }
}

export default RealityCheck;
