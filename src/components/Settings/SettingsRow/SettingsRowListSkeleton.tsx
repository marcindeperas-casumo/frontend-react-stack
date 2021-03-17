import React, { PureComponent } from "react";
import { times, identity } from "ramda";
import { SettingsRowSkeleton } from "./SettingsRowSkeleton";

type OwnProps = {
  count: number | undefined;
  height: number | undefined;
};

type Props = OwnProps & typeof SettingsRowListSkeleton.defaultProps;

export class SettingsRowListSkeleton extends PureComponent<Props> {
  static defaultProps = {
    count: 1,
    height: 80,
  };

  render() {
    const { count, height } = this.props;
    return times(identity, count).map(i => (
      <div key={`settings-row-item-${i}`} style={{ height }}>
        <SettingsRowSkeleton />
      </div>
    ));
  }
}
