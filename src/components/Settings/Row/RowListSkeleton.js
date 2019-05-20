// @flow
import React, { PureComponent } from "react";
import { times, identity } from "ramda";
import { RowSkeleton } from "./RowSkeleton";

type Props = {
  count: ?number,
  height: ?number,
};

export class RowListSkeleton extends PureComponent<Props> {
  static defaultProps = {
    count: 1,
    height: 80,
  };

  render() {
    const { count, height } = this.props;
    return times(identity, count).map(i => (
      <div key={`settings-row-item-${i}`} style={{ height }}>
        <RowSkeleton />
      </div>
    ));
  }
}
