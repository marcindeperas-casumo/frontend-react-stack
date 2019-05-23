// @flow
import React, { PureComponent } from "react";
import { times, identity } from "ramda";
import { SettingsRowSkeleton } from "./SettingsRowSkeleton";

type Props = {
  count: ?number,
  height: ?number,
};

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
