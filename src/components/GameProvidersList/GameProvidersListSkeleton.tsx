import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import { times } from "ramda";
import {
  leftPaddingClasses,
  topMarginClasses,
} from "Components/GameListHorizontal/constants";

type Props = {
  /* Additional css classes to add to the component **/
  className: string;
  /* The number of tile components to show **/
  numberOfItems: number;
  /* radius of tile **/
  tileRadius: number;
  /* gutter between each tile **/
  tileGutter: number;
};

export default class GameProvidersListSkeleton extends React.PureComponent<Props> {
  static defaultProps = {
    className: `o-wrapper ${leftPaddingClasses} ${topMarginClasses}`,
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
        preserveAspectRatio="xMinYMin meet"
      >
        <rect x="0" y="0" rx="8" ry="8" width="150" height="15" />
        {times(
          n => (
            <circle
              key={`tile-list-horizontal-skeleton-${n}`}
              r={tileRadius}
              cx={tileSpan * n + tileRadius}
              cy={tileRadius + 40}
            />
          ),
          numberOfItems
        )}
      </Skeleton>
    );
  }
}
