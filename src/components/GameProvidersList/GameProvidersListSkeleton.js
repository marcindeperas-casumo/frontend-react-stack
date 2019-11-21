//@flow
import React, { PureComponent } from "react";
import { times } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  /* Additional css classes to add to the component **/
  className: string,
  /* The number of tile components to show **/
  numberOfItems: number,
  /* radius of tile **/
  tileRadius: number,
  /* gutter between each tile **/
  tileGutter: number,
};

const defaultClassNames = `
  u-padding-top--lg
  u-padding-top--xlg@tablet
  u-padding-top--xlg@desktop
  u-padding-left--md
  u-padding-left--3xlg@tablet
  u-padding-left--3xlg@desktop
`;

export default class GameProvidersListSkeleton extends PureComponent<Props> {
  static defaultProps = {
    className: defaultClassNames,
    numberOfItems: 5,
    tileRadius: 80,
    tileGutter: 10,
  };

  render() {
    const { className, numberOfItems, tileRadius, tileGutter } = this.props;
    const tileSpan = tileRadius * 2 + tileGutter;
    return (
      <Skeleton
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
        className={className}
        width={numberOfItems * tileSpan}
        height="240"
      >
        <rect x="0" y="0" rx="8" ry="8" width="150" height="15" />
        {times(
          n => (
            <circle
              key={`tile-list-horizontal-skeleton-${n}`}
              r="80"
              cx={tileSpan * n + tileRadius}
              cy="120"
            />
          ),
          numberOfItems
        )}
      </Skeleton>
    );
  }
}
