// @flow
import React, { PureComponent } from "react";
import { times, identity } from "ramda";
import Skeleton from "@casumo/cmp-skeleton";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { ROW_HEIGHT } from "Components/GamesVirtualList/GamesVirtualList";

type OwnProps = {
    /* Additional css classes to add to the component **/
    className: string;
    /* Whether the list has a title or not **/
    hasTitle: boolean;
    /* The number of <GameRowSkeleton /> components to show **/
    numberOfItems: number;
    /* X axis title offset **/
    titleXOffset: number;
    /* Y axis title offset **/
    titleYOffset: number;
};

type Props = OwnProps & typeof GameListSkeleton.defaultProps;

export class GameListSkeleton extends PureComponent<Props> {
  static defaultProps = {
    className: "",
    hasTitle: true,
    numberOfItems: 8,
    titleXOffset: 0,
    titleYOffset: 0,
  };

  render() {
    const {
      className,
      hasTitle,
      numberOfItems,
      titleXOffset,
      titleYOffset,
    } = this.props;

    return (
      <div className={className}>
        {hasTitle && (
          <Skeleton
            colorHi="#d3d8e1"
            colorLow="#e5eaed"
            width="320"
            height="60"
            className="u-display--block"
          >
            <rect
              x={titleXOffset}
              y={titleYOffset}
              rx="3"
              ry="3"
              width="150"
              height="20"
            />
          </Skeleton>
        )}
        {times(identity, numberOfItems).map(i => (
          <div
            key={`gamelist-skeleton-${i}`}
            className="t-border-bottom t-border-grey-0"
            style={{ height: ROW_HEIGHT }}
          >
            <GameRowSkeleton />
          </div>
        ))}
      </div>
    );
  }
}
